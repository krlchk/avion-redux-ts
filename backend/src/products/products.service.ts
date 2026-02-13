import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  // GET ALL PRODUCTS
  async findAll(dto: PaginationDto) {
    const page = dto.page || 1;
    const limit = dto.limit || 10;
    const skip = (page - 1) * limit;

    const products = await this.prisma.product.findMany({
      skip: skip,
      take: limit,
      include: { category: true },
    });

    const total = await this.prisma.product.count();

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
