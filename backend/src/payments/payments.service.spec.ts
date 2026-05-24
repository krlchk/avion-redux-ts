import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatus } from '@prisma/client';
import { OrdersService } from 'src/orders/orders.service';
import { PrismaService } from 'src/prisma.service';
import { PaymentsService } from './payments.service';

const paymentIntentsCreate = jest.fn();
const paymentIntentsRetrieve = jest.fn();

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: paymentIntentsCreate,
      retrieve: paymentIntentsRetrieve,
    },
  }));
});

describe('PaymentsService', () => {
  let service: PaymentsService;

  const prisma = {
    order: {
      update: jest.fn(),
    },
  };

  const ordersService = {
    getById: jest.fn(),
  };

  const baseOrder = {
    id: 'order-1',
    userId: 'user-1',
    status: OrderStatus.PENDING,
    totalPrice: 123.45,
    currency: 'usd',
    paymentIntentId: 'pi_existing',
  };

  beforeEach(async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_mock';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: PrismaService, useValue: prisma },
        { provide: OrdersService, useValue: ordersService },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.STRIPE_SECRET_KEY;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a payment intent and save its id to the order', async () => {
    ordersService.getById.mockResolvedValue(baseOrder);
    paymentIntentsCreate.mockResolvedValue({
      id: 'pi_123',
      client_secret: 'client_secret_123',
    });

    const result = await service.createPaymentIntent('order-1', 'user-1');

    expect(ordersService.getById).toHaveBeenCalledWith('order-1', 'user-1');
    expect(paymentIntentsCreate).toHaveBeenCalledWith({
      amount: 12345,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: 'order-1',
        userId: 'user-1',
      },
    });
    expect(prisma.order.update).toHaveBeenCalledWith({
      where: { id: 'order-1' },
      data: { paymentIntentId: 'pi_123' },
    });
    expect(result).toEqual({
      paymentIntentId: 'pi_123',
      clientSecret: 'client_secret_123',
    });
  });

  it('should use usd when order currency is missing', async () => {
    ordersService.getById.mockResolvedValue({
      ...baseOrder,
      currency: null,
    });
    paymentIntentsCreate.mockResolvedValue({
      id: 'pi_123',
      client_secret: 'client_secret_123',
    });

    await service.createPaymentIntent('order-1', 'user-1');

    expect(paymentIntentsCreate).toHaveBeenCalledWith(
      expect.objectContaining({ currency: 'usd' }),
    );
  });

  it('should reject payment intent creation for an already paid order', async () => {
    ordersService.getById.mockResolvedValue({
      ...baseOrder,
      status: OrderStatus.PAID,
    });

    await expect(
      service.createPaymentIntent('order-1', 'user-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(paymentIntentsCreate).not.toHaveBeenCalled();
  });

  it('should reject payment intent creation when total price is missing', async () => {
    ordersService.getById.mockResolvedValue({
      ...baseOrder,
      totalPrice: null,
    });

    await expect(
      service.createPaymentIntent('order-1', 'user-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(paymentIntentsCreate).not.toHaveBeenCalled();
  });

  it('should reject payment intent creation when amount is invalid', async () => {
    ordersService.getById.mockResolvedValue({
      ...baseOrder,
      totalPrice: 0,
    });

    await expect(
      service.createPaymentIntent('order-1', 'user-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(paymentIntentsCreate).not.toHaveBeenCalled();
  });

  it('should return already paid status without calling Stripe', async () => {
    ordersService.getById.mockResolvedValue({
      ...baseOrder,
      status: OrderStatus.PAID,
    });

    const result = await service.confirmOrderPayment(
      'order-1',
      'pi_existing',
      'user-1',
    );

    expect(result).toEqual({ status: 'Ok', message: 'Already paid' });
    expect(paymentIntentsRetrieve).not.toHaveBeenCalled();
    expect(prisma.order.update).not.toHaveBeenCalled();
  });

  it('should confirm succeeded payment and mark order as paid', async () => {
    ordersService.getById.mockResolvedValue(baseOrder);
    paymentIntentsRetrieve.mockResolvedValue({ status: 'succeeded' });

    const result = await service.confirmOrderPayment(
      'order-1',
      'pi_existing',
      'user-1',
    );

    expect(paymentIntentsRetrieve).toHaveBeenCalledWith('pi_existing');
    expect(prisma.order.update).toHaveBeenCalledWith({
      where: { id: 'order-1' },
      data: {
        status: 'PAID',
        paidAt: expect.any(Date) as Date,
      },
    });
    expect(result).toEqual({
      status: 'Ok',
      message: 'Order with id: order-1 has been paid',
    });
  });

  it('should reject confirming a non-pending order', async () => {
    ordersService.getById.mockResolvedValue({
      ...baseOrder,
      status: OrderStatus.CANCELLED,
    });

    await expect(
      service.confirmOrderPayment('order-1', 'pi_existing', 'user-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject confirming order without payment intent id', async () => {
    ordersService.getById.mockResolvedValue({
      ...baseOrder,
      paymentIntentId: null,
    });

    await expect(
      service.confirmOrderPayment('order-1', 'pi_existing', 'user-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject confirming when payment intent id does not match', async () => {
    ordersService.getById.mockResolvedValue(baseOrder);

    await expect(
      service.confirmOrderPayment('order-1', 'pi_another', 'user-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(paymentIntentsRetrieve).not.toHaveBeenCalled();
  });

  it('should reject confirming when Stripe payment is not completed', async () => {
    ordersService.getById.mockResolvedValue(baseOrder);
    paymentIntentsRetrieve.mockResolvedValue({ status: 'processing' });

    await expect(
      service.confirmOrderPayment('order-1', 'pi_existing', 'user-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.order.update).not.toHaveBeenCalled();
  });
});
