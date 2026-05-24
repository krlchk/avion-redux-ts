import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
  let service: ReviewsService;

  const prisma = {
    review: {
      findMany: jest.fn(),
      aggregate: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
    product: {
      findUnique: jest.fn(),
    },
    order: {
      findFirst: jest.fn(),
    },
  };

  const customer = new UserEntity({
    id: 'user-1',
    role: Role.CUSTOMER,
  });
  const anotherCustomer = new UserEntity({
    id: 'user-2',
    role: Role.CUSTOMER,
  });
  const admin = new UserEntity({
    id: 'admin-1',
    role: Role.ADMIN,
  });

  const product = { id: 'product-1', title: 'Chair' };
  const review = {
    id: 'review-1',
    productId: 'product-1',
    userId: 'user-1',
    rating: 5,
    comment: 'Great chair',
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all reviews', async () => {
    prisma.review.findMany.mockResolvedValue([review]);

    await expect(service.getAllReviews()).resolves.toEqual({
      data: [review],
    });
  });

  it('should return product reviews with meta', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.review.findMany.mockResolvedValue([review]);
    prisma.review.aggregate.mockResolvedValue({
      _avg: { rating: 4.5 },
      _count: { rating: 2 },
    });

    await expect(service.getReviews('product-1')).resolves.toEqual({
      data: [review],
      meta: {
        averageRating: 4.5,
        reviewsCount: 2,
      },
    });
    expect(prisma.review.findMany).toHaveBeenCalledWith({
      where: { productId: 'product-1' },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  });

  it('should reject getting reviews for missing product', async () => {
    prisma.product.findUnique.mockResolvedValue(null);

    await expect(service.getReviews('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should create review when product was purchased in paid order', async () => {
    const dto = {
      productId: 'product-1',
      rating: 5,
      comment: 'Great chair',
    };
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.order.findFirst.mockResolvedValue({ id: 'order-1' });
    prisma.review.findFirst.mockResolvedValue(null);
    prisma.review.create.mockResolvedValue(review);

    await expect(service.create(dto, 'user-1')).resolves.toEqual(review);
    expect(prisma.order.findFirst).toHaveBeenCalledWith({
      where: {
        userId: 'user-1',
        status: 'PAID',
        items: {
          some: { productId: 'product-1' },
        },
      },
    });
    expect(prisma.review.create).toHaveBeenCalledWith({
      data: {
        ...dto,
        userId: 'user-1',
      },
    });
  });

  it('should reject review creation when product is missing', async () => {
    prisma.product.findUnique.mockResolvedValue(null);

    await expect(
      service.create({ productId: 'missing', rating: 5 }, 'user-1'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should reject review creation when user has not purchased product', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.order.findFirst.mockResolvedValue(null);

    await expect(
      service.create({ productId: 'product-1', rating: 5 }, 'user-1'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('should reject duplicate review creation', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.order.findFirst.mockResolvedValue({ id: 'order-1' });
    prisma.review.findFirst.mockResolvedValue(review);

    await expect(
      service.create({ productId: 'product-1', rating: 5 }, 'user-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should allow review creator to delete own review', async () => {
    prisma.review.findUnique.mockResolvedValue(review);
    prisma.review.delete.mockResolvedValue(review);

    await expect(service.delete('review-1', customer)).resolves.toEqual(review);
    expect(prisma.review.delete).toHaveBeenCalledWith({
      where: { id: 'review-1' },
    });
  });

  it('should allow admin to delete any review', async () => {
    prisma.review.findUnique.mockResolvedValue(review);
    prisma.review.delete.mockResolvedValue(review);

    await expect(service.delete('review-1', admin)).resolves.toEqual(review);
  });

  it('should reject deleting missing review', async () => {
    prisma.review.findUnique.mockResolvedValue(null);

    await expect(service.delete('missing', admin)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should reject deleting review for another customer', async () => {
    prisma.review.findUnique.mockResolvedValue(review);

    await expect(
      service.delete('review-1', anotherCustomer),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(prisma.review.delete).not.toHaveBeenCalled();
  });
});
