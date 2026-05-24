import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatus, PromoCodeType, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  const tx = {
    product: {
      update: jest.fn(),
    },
    promoCode: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    order: {
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const prisma = {
    product: {
      findMany: jest.fn(),
    },
    order: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    $transaction: jest.fn(),
  };
  type TransactionCallback = (transaction: typeof tx) => unknown;

  const user = {
    id: 'user-1',
    email: 'customer@example.com',
    name: 'Customer',
    role: Role.CUSTOMER,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    isTwoFactorEnabled: false,
    password: 'hashed',
    resetOtpHash: null,
    resetOtpExpiresAt: null,
    loginOtpHash: null,
    loginOtpExpiresAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
    prisma.$transaction.mockImplementation((callback: TransactionCallback) =>
      callback(tx),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a pending order, decrement stock and apply product and promo discounts', async () => {
    const futureDate = new Date('2099-01-01T00:00:00.000Z');
    const dto = {
      items: [
        { productId: 'product-1', quantity: 2 },
        { productId: 'product-2', quantity: 1 },
      ],
      promoCode: 'save10',
    };

    prisma.product.findMany.mockResolvedValue([
      {
        id: 'product-1',
        title: 'Chair',
        price: 100,
        stock: 5,
        discountPercent: 20,
        discountUntil: futureDate,
      },
      {
        id: 'product-2',
        title: 'Table',
        price: 50,
        stock: 3,
        discountPercent: null,
        discountUntil: null,
      },
    ]);

    tx.promoCode.findUnique.mockResolvedValue({
      id: 'promo-1',
      code: 'SAVE10',
      type: PromoCodeType.PERCENT,
      value: 10,
      isActive: true,
      expiresAt: futureDate,
      maxUses: 10,
      usedCount: 1,
    });

    tx.order.create.mockResolvedValue({
      id: 'order-1',
      status: OrderStatus.PENDING,
      userId: user.id,
      totalPrice: 189,
    });

    const result = await service.create(dto, user.id);

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { id: { in: ['product-1', 'product-2'] } },
    });
    expect(tx.product.update).toHaveBeenNthCalledWith(1, {
      where: { id: 'product-1' },
      data: { stock: { decrement: 2 } },
    });
    expect(tx.product.update).toHaveBeenNthCalledWith(2, {
      where: { id: 'product-2' },
      data: { stock: { decrement: 1 } },
    });
    expect(tx.order.create).toHaveBeenCalledWith({
      data: {
        status: 'PENDING',
        userId: user.id,
        subtotalPrice: 210,
        promoDiscountAmount: 21,
        promoCodeId: 'promo-1',
        items: {
          create: [
            { productId: 'product-1', quantity: 2, price: 80 },
            { productId: 'product-2', quantity: 1, price: 50 },
          ],
        },
        totalPrice: 189,
        totalPriceWithoutPromoCodesDiscounts: 250,
      },
      include: { items: true },
    });
    expect(tx.promoCode.update).toHaveBeenCalledWith({
      where: { code: 'SAVE10' },
      data: { usedCount: { increment: 1 } },
    });
    expect(result).toEqual({
      id: 'order-1',
      status: OrderStatus.PENDING,
      userId: user.id,
      totalPrice: 189,
    });
  });

  it('should reject order creation when some products were not found', async () => {
    prisma.product.findMany.mockResolvedValue([
      {
        id: 'product-1',
        title: 'Chair',
        price: 100,
        stock: 5,
        discountPercent: null,
        discountUntil: null,
      },
    ]);

    await expect(
      service.create(
        {
          items: [
            { productId: 'product-1', quantity: 1 },
            { productId: 'missing-product', quantity: 1 },
          ],
        },
        user.id,
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject order creation when product stock is not enough', async () => {
    prisma.product.findMany.mockResolvedValue([
      {
        id: 'product-1',
        title: 'Chair',
        price: 100,
        stock: 1,
        discountPercent: null,
        discountUntil: null,
      },
    ]);

    await expect(
      service.create(
        { items: [{ productId: 'product-1', quantity: 2 }] },
        user.id,
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject order creation when promo code does not exist', async () => {
    prisma.product.findMany.mockResolvedValue([
      {
        id: 'product-1',
        title: 'Chair',
        price: 100,
        stock: 3,
        discountPercent: null,
        discountUntil: null,
      },
    ]);
    tx.promoCode.findUnique.mockResolvedValue(null);

    await expect(
      service.create(
        {
          items: [{ productId: 'product-1', quantity: 1 }],
          promoCode: 'missing',
        },
        user.id,
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should allow order owner to cancel a pending order and restore stock', async () => {
    prisma.order.findUnique.mockResolvedValue({
      id: 'order-1',
      userId: user.id,
      status: OrderStatus.PENDING,
      items: [
        { productId: 'product-1', quantity: 2 },
        { productId: 'product-2', quantity: 1 },
      ],
    });
    tx.order.update.mockResolvedValue({
      id: 'order-1',
      status: OrderStatus.CANCELLED,
    });

    const result = await service.cancelOrder('order-1', user);

    expect(tx.product.update).toHaveBeenNthCalledWith(1, {
      where: { id: 'product-1' },
      data: { stock: { increment: 2 } },
    });
    expect(tx.product.update).toHaveBeenNthCalledWith(2, {
      where: { id: 'product-2' },
      data: { stock: { increment: 1 } },
    });
    expect(tx.order.update).toHaveBeenCalledWith({
      where: { id: 'order-1' },
      data: { status: 'CANCELLED' },
    });
    expect(result).toEqual({
      id: 'order-1',
      status: OrderStatus.CANCELLED,
    });
  });

  it('should allow admin to cancel another user order', async () => {
    prisma.order.findUnique.mockResolvedValue({
      id: 'order-1',
      userId: 'another-user',
      status: OrderStatus.PENDING,
      items: [{ productId: 'product-1', quantity: 1 }],
    });
    tx.order.update.mockResolvedValue({
      id: 'order-1',
      status: OrderStatus.CANCELLED,
    });

    await expect(
      service.cancelOrder('order-1', { ...user, role: Role.ADMIN }),
    ).resolves.toEqual({
      id: 'order-1',
      status: OrderStatus.CANCELLED,
    });
  });

  it('should reject canceling another user order for customer', async () => {
    prisma.order.findUnique.mockResolvedValue({
      id: 'order-1',
      userId: 'another-user',
      status: OrderStatus.PENDING,
      items: [{ productId: 'product-1', quantity: 1 }],
    });

    await expect(service.cancelOrder('order-1', user)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should reject canceling non-pending order', async () => {
    prisma.order.findUnique.mockResolvedValue({
      id: 'order-1',
      userId: user.id,
      status: OrderStatus.PAID,
      items: [{ productId: 'product-1', quantity: 1 }],
    });

    await expect(service.cancelOrder('order-1', user)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
