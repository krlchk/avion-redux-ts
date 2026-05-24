import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductsQueryDto } from './dto/products-query.dto';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  const prisma = {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
    category: {
      findUnique: jest.fn(),
    },
  };

  const admin = new UserEntity({
    id: 'admin-1',
    role: Role.ADMIN,
  });
  const designer = new UserEntity({
    id: 'designer-1',
    role: Role.DESIGNER,
  });
  const anotherDesigner = new UserEntity({
    id: 'designer-2',
    role: Role.DESIGNER,
  });
  const customer = new UserEntity({
    id: 'customer-1',
    role: Role.CUSTOMER,
  });

  const product = {
    id: 'product-1',
    title: 'Chair',
    description: 'Comfortable chair',
    img: 'chair.png',
    price: 100,
    stock: 4,
    width: 50,
    height: 80,
    depth: 45,
    designerId: 'designer-1',
    categoryId: 'category-1',
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    discountPercent: 20,
    discountUntil: new Date('2099-01-01T00:00:00.000Z'),
    reviews: [{ rating: 4 }, { rating: 5 }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all products with filters, sorting and pagination', async () => {
    prisma.product.findMany.mockResolvedValue([product]);
    prisma.product.count.mockResolvedValue(12);
    const query: ProductsQueryDto = {
      page: 2,
      limit: 9,
      categoryIds: ['category-1'],
      designerIds: ['designer-1'],
      search: 'chair',
      minPrice: 50,
      maxPrice: 150,
      inStock: true,
      sortBy: 'price' as ProductsQueryDto['sortBy'],
      sortOrder: 'asc' as ProductsQueryDto['sortOrder'],
    };

    await expect(service.findAll(query)).resolves.toEqual({
      data: [
        expect.objectContaining({
          id: 'product-1',
          finalPrice: 80,
          reviewsCount: 2,
          averageRating: 4.5,
        }),
      ],
      meta: {
        total: 12,
        page: 2,
        lastPage: 2,
      },
    });
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {
        designerId: { in: ['designer-1'] },
        categoryId: { in: ['category-1'] },
        title: {
          contains: 'chair',
          mode: 'insensitive',
        },
        price: {
          gte: 50,
          lte: 150,
        },
        stock: { gt: 0 },
      },
      orderBy: { price: 'asc' },
      skip: 9,
      take: 9,
      include: { category: true, reviews: true },
    });
  });

  it('should return product by id with mapped meta', async () => {
    prisma.product.findUnique.mockResolvedValue(product);

    await expect(service.getById('product-1')).resolves.toEqual(
      expect.objectContaining({
        id: 'product-1',
        finalPrice: 80,
        reviewsCount: 2,
        averageRating: 4.5,
      }),
    );
  });

  it('should reject when product is not found', async () => {
    prisma.product.findUnique.mockResolvedValue(null);

    await expect(service.getById('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should create product when category exists', async () => {
    const dto = {
      title: 'Chair',
      description: 'Comfortable chair',
      img: '',
      price: 100,
      stock: 4,
      width: 50,
      height: 80,
      depth: 45,
      categoryId: 'category-1',
    };
    prisma.category.findUnique.mockResolvedValue({
      id: 'category-1',
      name: 'Chairs',
    });
    prisma.product.create.mockResolvedValue({
      ...dto,
      id: 'product-1',
      img: 'image-url',
      designerId: 'designer-1',
    });

    await service.create(dto, 'designer-1', 'image-url');

    expect(prisma.product.create).toHaveBeenCalledWith({
      data: {
        ...dto,
        img: 'image-url',
        designerId: 'designer-1',
      },
    });
  });

  it('should reject product creation when category is missing', async () => {
    prisma.category.findUnique.mockResolvedValue(null);

    await expect(
      service.create(
        {
          title: 'Chair',
          description: 'Comfortable chair',
          img: '',
          price: 100,
          stock: 4,
          width: 50,
          height: 80,
          depth: 45,
          categoryId: 'missing-category',
        },
        'designer-1',
        'image-url',
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.product.create).not.toHaveBeenCalled();
  });

  it('should allow admin to delete any product', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.product.delete.mockResolvedValue(product);

    await expect(service.delete('product-1', admin)).resolves.toEqual(product);
    expect(prisma.product.delete).toHaveBeenCalledWith({
      where: { id: 'product-1' },
    });
  });

  it('should allow owner designer to delete own product', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.product.delete.mockResolvedValue(product);

    await expect(service.delete('product-1', designer)).resolves.toEqual(
      product,
    );
  });

  it('should reject deleting product for another designer', async () => {
    prisma.product.findUnique.mockResolvedValue(product);

    await expect(
      service.delete('product-1', anotherDesigner),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('should find designer products', async () => {
    prisma.product.findMany.mockResolvedValue([product]);

    await expect(service.findByDesignerId('designer-1')).resolves.toEqual([
      expect.objectContaining({
        id: 'product-1',
        finalPrice: 80,
      }),
    ]);
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { designerId: 'designer-1' },
      include: { reviews: true },
    });
  });

  it('should reject finding designer products without designer id', async () => {
    await expect(service.findByDesignerId('')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should return own products for designer', async () => {
    prisma.product.findMany.mockResolvedValue([product]);

    await expect(service.findMyProducts(designer)).resolves.toEqual({
      data: [
        expect.objectContaining({
          id: 'product-1',
          finalPrice: 80,
        }),
      ],
    });
  });

  it('should return all products for admin', async () => {
    prisma.product.findMany.mockResolvedValue([product]);

    await expect(service.findMyProducts(admin)).resolves.toEqual({
      data: [
        expect.objectContaining({
          id: 'product-1',
          finalPrice: 80,
        }),
      ],
    });
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      include: { reviews: true, designer: true },
    });
  });

  it('should reject own products for customer', async () => {
    await expect(service.findMyProducts(customer)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should allow admin to update product and validate category', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.category.findUnique.mockResolvedValue({
      id: 'category-2',
      name: 'Tables',
    });
    prisma.product.update.mockResolvedValue({
      ...product,
      categoryId: 'category-2',
    });

    await service.update('product-1', { categoryId: 'category-2' }, admin);

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: 'product-1' },
      data: { categoryId: 'category-2' },
    });
  });

  it('should allow owner designer to update own product', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.product.update.mockResolvedValue({
      ...product,
      title: 'Updated Chair',
    });

    await expect(
      service.update('product-1', { title: 'Updated Chair' }, designer),
    ).resolves.toEqual(expect.objectContaining({ title: 'Updated Chair' }));
  });

  it('should reject product update for another designer', async () => {
    prisma.product.findUnique.mockResolvedValue(product);

    await expect(
      service.update('product-1', { title: 'Updated Chair' }, anotherDesigner),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('should set product discount', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.product.update.mockResolvedValue({
      ...product,
      discountPercent: 15,
    });

    await service.setDiscount('product-1', {
      discountPercent: 15,
      discountUntil: '2099-01-01T00:00:00.000Z',
    });

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: 'product-1' },
      data: {
        discountPercent: 15,
        discountUntil: new Date('2099-01-01T00:00:00.000Z'),
      },
    });
  });

  it('should clear product discount when discount percent is not provided', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.product.update.mockResolvedValue({
      ...product,
      discountPercent: null,
      discountUntil: null,
    });

    await service.setDiscount('product-1', { discountPercent: 0 });

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: 'product-1' },
      data: {
        discountPercent: null,
        discountUntil: null,
      },
    });
  });
});
