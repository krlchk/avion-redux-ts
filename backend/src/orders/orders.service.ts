import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
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
  // CREATE ORDER
  async create(dto: CreateOrderDto, userId: string) {
    const ids = dto.items.map((item) => item.productId);

    const products = await this.prisma.product.findMany({
      where: { id: { in: ids } },
    });

    if (ids.length !== products.length) {
      throw new BadRequestException('Some products not found');
    }

    let totalPrice = 0;

    const orderItemsData = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new BadRequestException(`Product not found`);
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Not enough stock for ${product.title}`);
      }

      const price = Number(product.price);
      totalPrice += price * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: price,
      };
    });

    return this.prisma.$transaction(async (tx) => {
      for (const item of orderItemsData) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return tx.order.create({
        data: {
          status: 'PENDING',
          userId: userId,
          totalPrice: totalPrice,
          items: {
            create: orderItemsData,
          },
        },
        include: { items: true },
      });
    });
  }
  // UPDATE STATUS
  async updateStatus(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: status },
    });
  }
}
