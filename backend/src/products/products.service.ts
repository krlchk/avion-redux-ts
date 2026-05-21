import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, Review, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsQueryDto } from './dto/products-query.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Prisma } from '@prisma/client';
import { DiscountProductDto } from './dto/discount-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  private mapProductMeta(product: Product & { reviews: Review[] }) {
    const reviewsCount = product.reviews.length;
    let averageRating = 0;
    const reviewsRatingSum = product.reviews.reduce((result, review) => {
      return result + review.rating;
    }, 0);
    if (reviewsCount > 0) {
      averageRating = reviewsRatingSum / reviewsCount;
    }
    return {
      reviewsCount,
      averageRating: Number(averageRating.toFixed(1)),
    };
  }

  private mapProductResponse(
    product: Product & { reviews: Review[] },
    now: Date = new Date(),
  ) {
    let finalPrice = Number(product.price);

    const { reviewsCount, averageRating } = this.mapProductMeta(product);

    const isDiscountActive =
      product.discountPercent &&
      (!product.discountUntil || product.discountUntil > now);
    if (isDiscountActive && product.discountPercent) {
      finalPrice = Number(product.price) * (1 - product.discountPercent / 100);
    }

    return {
      ...product,
      finalPrice: Number(finalPrice.toFixed(2)),
      reviewsCount,
      averageRating,
    };
  }

  // GET ALL PRODUCTS
  async findAll(dto: ProductsQueryDto) {
    const page = dto.page || 1;
    const limit = dto.limit || 9;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};

    if (dto.ids?.length) {
      where.id = {
        in: dto.ids,
      };
    }

    if (dto.designerIds && dto.designerIds.length > 0) {
      where.designerId = { in: dto.designerIds };
    }

    if (dto.categoryIds && dto.categoryIds.length > 0) {
      where.categoryId = { in: dto.categoryIds };
    }

    if (dto.search) {
      where.title = {
        contains: dto.search,
        mode: 'insensitive',
      };
    }

    if (dto.minPrice !== undefined || dto.maxPrice !== undefined) {
      where.price = {};
      if (dto.minPrice !== undefined) {
        where.price.gte = dto.minPrice;
      }
      if (dto.maxPrice !== undefined) {
        where.price.lte = dto.maxPrice;
      }
    }

    if (dto.inStock === true) {
      where.stock = { gt: 0 };
    }

    if (dto.inStock === false) {
      where.stock = 0;
    }

    if (dto.sortBy) {
      orderBy[dto.sortBy] = dto.sortOrder || 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }

    const products = await this.prisma.product.findMany({
      where,
      orderBy,
      skip: skip,
      take: limit,
      include: { category: true, reviews: true },
    });

    const data = products.map((product) => this.mapProductResponse(product));

    const total = await this.prisma.product.count({
      where,
    });

    return {
      data: data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
  // GET PRODUCT BY ID
  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
      include: { reviews: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }

    return this.mapProductResponse(product);
  }
  // CREATE NEW PRODUCT
  async create(dto: CreateProductDto, userId: string, imgUrl: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: dto.categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException(
        `You can not add this product because category with id:${dto.categoryId} not found`,
      );
    }
    return this.prisma.product.create({
      data: {
        ...dto,
        img: imgUrl,
        designerId: userId,
      },
    });
  }
  // DELETE PRODUCT
  async delete(id: string, user: UserEntity): Promise<Product> {
    const product = await this.getById(id);

    if (user.role === Role.ADMIN) {
      return this.prisma.product.delete({
        where: {
          id: id,
        },
      });
    }

    if (user.role === Role.DESIGNER && user.id === product.designerId) {
      return this.prisma.product.delete({
        where: {
          id: id,
        },
      });
    }

    throw new ForbiddenException('You are not allowed to delete this product');
  }
  // GET GY DESIGNER ID
  async findByDesignerId(designerId: string) {
    if (!designerId) {
      throw new ForbiddenException('The designer id must be');
    }
    const products = await this.prisma.product.findMany({
      where: { designerId: designerId },
      include: { reviews: true },
    });

    return products.map((product) => this.mapProductResponse(product));
  }
  // GET MY PRODUCTS
  async findMyProducts(user: UserEntity) {
    if (user.role === 'DESIGNER') {
      return this.findByDesignerId(user.id);
    }
    if (user.role === 'ADMIN') {
      const products = await this.prisma.product.findMany({
        include: { reviews: true, designer: true },
      });
      const data = products.map((product) => this.mapProductResponse(product));

      return {
        data,
      };
    }

    throw new ForbiddenException(
      'You are not allowed to create and get your products. Only admin and designer have access',
    );
  }
  // UPDATE PRODUCT BY ID
  async update(
    id: string,
    dto: UpdateProductDto,
    user: UserEntity,
  ): Promise<Product> {
    const product = await this.getById(id);
    const category = await this.prisma.category.findUnique({
      where: {
        id: dto.categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException(
        `You can not update this product because category with id:${dto.categoryId} not found`,
      );
    }

    if (user.role === Role.ADMIN) {
      return this.prisma.product.update({
        where: { id: id },
        data: dto,
      });
    }

    if (user.role === Role.DESIGNER && product.designerId === user.id) {
      return this.prisma.product.update({
        where: {
          id: id,
        },
        data: dto,
      });
    }

    throw new ForbiddenException('You are not allowed to update this product');
  }
  // SET DISCOUNT
  async setDiscount(id: string, dto: DiscountProductDto): Promise<Product> {
    await this.getById(id);
    if (!dto.discountPercent || dto.discountPercent === 0) {
      return this.prisma.product.update({
        where: { id: id },
        data: {
          discountPercent: null,
          discountUntil: null,
        },
      });
    }
    return this.prisma.product.update({
      where: { id: id },
      data: {
        discountPercent: dto.discountPercent,
        discountUntil: dto.discountUntil ? new Date(dto.discountUntil) : null,
      },
    });
  }
}
