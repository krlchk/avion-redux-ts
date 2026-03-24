import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  // GET ALL CATEGORIES
  async findAll() {
    const data = await this.prisma.category.findMany();
    return {
      data,
    };
  }
  // GET CATEGORY BY ID
  async getById(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id: id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id:${id} not found`);
    }
    return category;
  }
  // CREATE CATEGORY BY ID
  async create(dto: CreateCategoryDto): Promise<Category> {
    const existCategory = await this.prisma.category.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (existCategory) {
      throw new BadRequestException(`Category '${dto.name}' alreay exists`);
    }

    return this.prisma.category.create({
      data: {
        ...dto,
      },
    });
  }
  // DELET CATEGORY
  async delete(id: string): Promise<Category> {
    await this.getById(id);
    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
  // UPDATE CATEGORY BY ID
  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    await this.getById(id);
    return this.prisma.category.update({
      data: dto,
      where: {
        id: id,
      },
    });
  }
}
