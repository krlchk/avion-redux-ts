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

  async handleWebhook(req: Request, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new BadRequestException('STRIPE_WEBHOOK_SECRET not set');
    }
    try {
      const event = this.stripe.webhooks.constructEvent(
        req.body as unknown as Buffer,
        signature,
        webhookSecret,
      );

      switch (event.type) {
        case 'payment_intent.succeeded': {
          {
            const paymentIntentId = event.data.object.id;
            const order =
              await this.ordersService.getOrderByIntentId(paymentIntentId);
            if (order.status !== 'PAID') {
              await this.ordersService.updateStatus(order.id, 'PAID');
              console.log('Payment succeeded for ', paymentIntentId);
            }
            if (order.status === 'CANCELLED') {
              console.log('Payment succeeded but order is CANCELLED', order.id);
            }
          }
          break;
        }
        case 'payment_intent.payment_failed': {
          console.log('Payment failed');
          break;
        }

        default:
          console.log('Unhandled event type: ', event.type);
      }
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Invalid stripe signature');
    }
  }
}
