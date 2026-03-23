import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus, PromoCode } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  // GET ALL ORDERS
  async findAll(status?: OrderStatus) {
    if (status) {
      return this.prisma.order.findMany({
        where: { status: status },
      });
    }
    return this.prisma.order.findMany();
  }
  // GET ORDER BY ID
  async getById(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.userId !== userId) {
      throw new ForbiddenException('You are not allowed to view this order');
    }

    return order;
  }
  // GET MY ORDER
  async getMyOrders(userId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });
  }
  // GET ORDER BY PAYMENT INTENT ID
  async getOrderByIntentId(intentId: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { paymentIntentId: intentId },
    });

    if (!order)
      throw new NotFoundException(
        `Order by this intent id ${intentId} not found`,
      );

    return order;
  }
  // CREATE ORDER
  async create(dto: CreateOrderDto, userId: string) {
    const ids = dto.items.map((item) => item.productId);

    const products = await this.prisma.product.findMany({
      where: { id: { in: ids } },
    });

    if (ids.length !== products.length) {
      throw new BadRequestException('Some products not found');
    }

    let subtotalPrice = 0;
    let totalPriceWithoutPromoCodesDiscounts = 0;
    const now = new Date();

    const orderItemsData = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new BadRequestException(`Product not found`);
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Not enough stock for ${product.title}`);
      }

      let finalPrice = Number(product.price);
      const finalPriceWithoutPromoCodesDiscounts = Number(product.price);
      const isDiscountActive =
        product.discountPercent &&
        (!product.discountUntil || product.discountUntil > now);
      if (isDiscountActive && product.discountPercent) {
        finalPrice =
          Number(product.price) * (1 - product.discountPercent / 100);
      }

      totalPriceWithoutPromoCodesDiscounts =
        finalPriceWithoutPromoCodesDiscounts * item.quantity;

      subtotalPrice += finalPrice * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: finalPrice,
      };
    });

    return this.prisma.$transaction(async (tx) => {
      let promoDiscountAmount = 0;
      let promoCode: PromoCode | null = null;
      const normalizedPromoCode = dto.promoCode?.toUpperCase();
      if (dto.promoCode) {
        promoCode = await tx.promoCode.findUnique({
          where: { code: normalizedPromoCode },
        });
        if (promoCode === null) {
          throw new NotFoundException('Promo code not found');
        }
        if (promoCode?.isActive === false) {
          throw new BadRequestException('Promo code not active');
        }
        if (
          promoCode.maxUses !== null &&
          promoCode.maxUses <= promoCode.usedCount
        ) {
          throw new BadRequestException('Promo code limit exceeded');
        }
        if (promoCode.expiresAt !== null && promoCode.expiresAt < now) {
          throw new BadRequestException('Promo code expired');
        }
        if (promoCode.type === 'PERCENT') {
          promoDiscountAmount =
            (subtotalPrice * Number(promoCode?.value)) / 100;
        }
        if (promoCode.type === 'FIXED') {
          promoDiscountAmount = Number(promoCode?.value);
        }
        if (promoDiscountAmount > subtotalPrice) {
          promoDiscountAmount = subtotalPrice;
        }
      }

      for (const item of orderItemsData) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const order = await tx.order.create({
        data: {
          status: 'PENDING',
          userId: userId,
          subtotalPrice: subtotalPrice,
          promoDiscountAmount: promoDiscountAmount,
          promoCodeId: promoCode?.id,
          items: {
            create: orderItemsData,
          },
          totalPrice: subtotalPrice - promoDiscountAmount,
          totalPriceWithoutPromoCodesDiscounts:
            totalPriceWithoutPromoCodesDiscounts,
        },
        include: { items: true },
      });

      if (promoCode !== null) {
        await tx.promoCode.update({
          where: { code: normalizedPromoCode },
          data: { usedCount: { increment: 1 } },
        });
      }

      return order;
    });
  }
  // UPDATE STATUS
  async updateStatus(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status, ...(status === 'PAID' ? { paidAt: new Date() } : {}) },
    });
  }

  async getByIdForAdmin(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async cancelOrder(orderId: string) {
    const order = await this.getByIdForAdmin(orderId);
    if (order.status !== 'PENDING')
      throw new BadRequestException('Order must be with status PENDING');

    return this.prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
      const canceledOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'CANCELLED',
        },
      });
      return canceledOrder;
    });
  }
}
