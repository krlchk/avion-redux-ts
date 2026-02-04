import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  // GET ALL PRODUCTS
  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
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
  create(dto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: dto,
    });
  }
  // DELETE PRODUCT
  async delete(id: string): Promise<Product> {
    await this.getById(id);
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
  // UPDATE PRODUCT BY ID
  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.getById(id);
    return this.prisma.product.update({
      where: { id: id },
      data: dto,
    });
  }
}
