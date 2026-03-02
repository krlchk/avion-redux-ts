import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsQueryDto } from './dto/products-query.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  // GET ALL PRODUCTS
  async findAll(dto: ProductsQueryDto) {
    const page = dto.page || 1;
    const limit = dto.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};

    if (dto.designerId) {
      where.designerId = dto.designerId;
    }

    if (dto.categoryId) {
      where.categoryId = dto.categoryId;
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
      include: { category: true },
    });

    const total = await this.prisma.product.count({
      where,
    });

    return {
      data: products,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
  // GET PRODUCT BY ID
  async getById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }
    return product;
  }
  // CREATE NEW PRODUCT
  async create(dto: CreateProductDto, userId: string, imgUrl: string) {
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
  findByDesignerId(designerId: string): Promise<Product[]> {
    if (!designerId) {
      throw new ForbiddenException('The designer id must be');
    }
    return this.prisma.product.findMany({
      where: { designerId: designerId },
    });
  }
  // GET MY PRODUCTS
  async findMyProducts(user: UserEntity): Promise<Product[]> {
    if (user.role === 'DESIGNER') {
      return this.findByDesignerId(user.id);
    }
    if (user.role === 'ADMIN') {
      return this.prisma.product.findMany();
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
}
