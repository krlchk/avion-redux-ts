import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { PrismaService } from 'src/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ordersService: OrdersService,
  ) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('Secret key not provided');
    }
    this.stripe = new Stripe(secretKey);
  }
  async createPaymentIntent(orderId: string, userId: string) {
    const order = await this.ordersService.getById(orderId, userId);
    if (order.status === 'PAID') {
      throw new BadRequestException('Order already paid');
    }
    if (order.totalPrice === null || order.totalPrice === undefined) {
      throw new BadRequestException('Order totalPrice is missing');
    }
    const amount = Math.round(Number(order.totalPrice) * 100);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException('Invalid order amount');
    }

    const intent = await this.stripe.paymentIntents.create({
      amount,
      currency: order.currency ?? 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: order.id,
        userId,
      },
    });

    await this.prismaService.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentIntentId: intent.id,
      },
    });

    return {
      paymentIntentId: intent.id,
      clientSecret: intent.client_secret,
    };
  }
}
