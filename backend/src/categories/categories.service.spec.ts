import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  const prisma = {
    category: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return categories with products count', async () => {
    prisma.category.findMany.mockResolvedValue([
      { id: 'category-1', name: 'Chairs', _count: { products: 3 } },
      { id: 'category-2', name: 'Tables', _count: { products: 1 } },
    ]);

    await expect(service.findAll()).resolves.toEqual({
      data: [
        { id: 'category-1', name: 'Chairs', productsCount: 3 },
        { id: 'category-2', name: 'Tables', productsCount: 1 },
      ],
    });
    expect(prisma.category.findMany).toHaveBeenCalledWith({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
  });

  it('should return category by id', async () => {
    const category = { id: 'category-1', name: 'Chairs' };
    prisma.category.findUnique.mockResolvedValue(category);

    await expect(service.getById('category-1')).resolves.toEqual(category);
    expect(prisma.category.findUnique).toHaveBeenCalledWith({
      where: { id: 'category-1' },
    });
  });

  it('should reject when category is not found', async () => {
    prisma.category.findUnique.mockResolvedValue(null);

    await expect(service.getById('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should create category when name is unique', async () => {
    const category = { id: 'category-1', name: 'Chairs' };
    prisma.category.findUnique.mockResolvedValue(null);
    prisma.category.create.mockResolvedValue(category);

    await expect(service.create('Chairs')).resolves.toEqual(category);
    expect(prisma.category.create).toHaveBeenCalledWith({
      data: { name: 'Chairs' },
    });
  });

  it('should reject creating category with duplicate name', async () => {
    prisma.category.findUnique.mockResolvedValue({
      id: 'category-1',
      name: 'Chairs',
    });

    await expect(service.create('Chairs')).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(prisma.category.create).not.toHaveBeenCalled();
  });

  it('should delete existing category', async () => {
    const category = { id: 'category-1', name: 'Chairs' };
    prisma.category.findUnique.mockResolvedValue(category);
    prisma.category.delete.mockResolvedValue(category);

    await expect(service.delete('category-1')).resolves.toEqual(category);
    expect(prisma.category.delete).toHaveBeenCalledWith({
      where: { id: 'category-1' },
    });
  });

  it('should update existing category', async () => {
    const category = { id: 'category-1', name: 'Chairs' };
    const updatedCategory = { id: 'category-1', name: 'Armchairs' };
    prisma.category.findUnique.mockResolvedValue(category);
    prisma.category.update.mockResolvedValue(updatedCategory);

    await expect(service.update('category-1', 'Armchairs')).resolves.toEqual(
      updatedCategory,
    );
    expect(prisma.category.update).toHaveBeenCalledWith({
      data: { name: 'Armchairs' },
      where: { id: 'category-1' },
    });
  });
});
