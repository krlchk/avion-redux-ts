import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    const data = categories.map((category) => ({
      id: category.id,
      name: category.name,
      productsCount: category._count.products,
    }));

    return {
      data,
    };
  }
  async getById(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id: id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id:${id} not found`);
    }
    return category;
  }
  async create(name: string): Promise<Category> {
    const existCategory = await this.prisma.category.findUnique({
      where: {
        name: name,
      },
    });

    if (existCategory) {
      throw new BadRequestException(`Category '${name}' alreay exists`);
    }

    return this.prisma.category.create({
      data: {
        name: name,
      },
    });
  }
  async delete(id: string): Promise<Category> {
    await this.getById(id);
    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
  async update(id: string, name?: string): Promise<Category> {
    await this.getById(id);
    return this.prisma.category.update({
      data: { name: name },
      where: {
        id: id,
      },
    });
  }
}
