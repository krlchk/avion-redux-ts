import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PromoCodeType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PromocodesService } from './promocodes.service';

describe('PromocodesService', () => {
  let service: PromocodesService;

  const prisma = {
    promoCode: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
  };

  const promoCode = {
    id: 'promo-1',
    code: 'SAVE10',
    title: 'Save 10%',
    type: PromoCodeType.PERCENT,
    value: 10,
    isActive: true,
    expiresAt: new Date('2099-01-01T00:00:00.000Z'),
    maxUses: 5,
    usedCount: 1,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromocodesService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<PromocodesService>(PromocodesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all promo codes ordered by createdAt desc', async () => {
    prisma.promoCode.findMany.mockResolvedValue([promoCode]);

    await expect(service.getAll()).resolves.toEqual({ data: [promoCode] });
    expect(prisma.promoCode.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
    });
  });

  it('should return promo code by id', async () => {
    prisma.promoCode.findUnique.mockResolvedValue(promoCode);

    await expect(service.getById('promo-1')).resolves.toEqual(promoCode);
    expect(prisma.promoCode.findUnique).toHaveBeenCalledWith({
      where: { id: 'promo-1' },
    });
  });

  it('should reject when promo code by id is not found', async () => {
    prisma.promoCode.findUnique.mockResolvedValue(null);

    await expect(service.getById('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should normalize code and find promo code by code', async () => {
    prisma.promoCode.findUnique.mockResolvedValue(promoCode);

    await expect(service.findByCode('save10')).resolves.toEqual(promoCode);
    expect(prisma.promoCode.findUnique).toHaveBeenCalledWith({
      where: { code: 'SAVE10' },
    });
  });

  it('should validate active customer promo code', async () => {
    prisma.promoCode.findUnique.mockResolvedValue(promoCode);

    await expect(service.validateForCustomer('save10')).resolves.toEqual({
      code: 'SAVE10',
      title: 'Save 10%',
      type: PromoCodeType.PERCENT,
      value: 10,
      expiresAt: promoCode.expiresAt,
    });
  });

  it('should reject inactive customer promo code', async () => {
    prisma.promoCode.findUnique.mockResolvedValue({
      ...promoCode,
      isActive: false,
    });

    await expect(service.validateForCustomer('save10')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should reject promo code when usage limit is exceeded', async () => {
    prisma.promoCode.findUnique.mockResolvedValue({
      ...promoCode,
      maxUses: 5,
      usedCount: 5,
    });

    await expect(service.validateForCustomer('save10')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should reject expired promo code', async () => {
    prisma.promoCode.findUnique.mockResolvedValue({
      ...promoCode,
      expiresAt: new Date('2020-01-01T00:00:00.000Z'),
    });

    await expect(service.validateForCustomer('save10')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should toggle promo code active state', async () => {
    prisma.promoCode.findUnique.mockResolvedValue(promoCode);
    prisma.promoCode.update.mockResolvedValue({
      ...promoCode,
      isActive: false,
    });

    await expect(
      service.toggleActivatePromoCode('save10', false),
    ).resolves.toEqual({
      ...promoCode,
      isActive: false,
    });
    expect(prisma.promoCode.update).toHaveBeenCalledWith({
      where: { code: 'SAVE10' },
      data: { isActive: false },
    });
  });

  it('should create promo code with normalized code and date', async () => {
    const dto = {
      code: 'save10',
      title: 'Save 10%',
      type: PromoCodeType.PERCENT,
      value: 10,
      expiresAt: '2099-01-01T00:00:00.000Z',
      maxUses: 5,
    };
    prisma.promoCode.findUnique.mockResolvedValue(null);
    prisma.promoCode.create.mockResolvedValue(promoCode);

    await expect(service.create(dto)).resolves.toEqual(promoCode);
    expect(prisma.promoCode.create).toHaveBeenCalledWith({
      data: {
        ...dto,
        code: 'SAVE10',
        expiresAt: new Date('2099-01-01T00:00:00.000Z'),
      },
    });
  });

  it('should reject creating duplicate promo code', async () => {
    prisma.promoCode.findUnique.mockResolvedValue(promoCode);

    await expect(
      service.create({
        code: 'save10',
        type: PromoCodeType.PERCENT,
        value: 10,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.promoCode.create).not.toHaveBeenCalled();
  });
});
