import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePromoCodeDto } from './dto/create-promocode.dto';

@Injectable()
export class PromocodesService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll() {
    const data = await this.prisma.promoCode.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return {
      data,
    };
  }
  async getById(promoCodeId: string) {
    const promoCode = await this.prisma.promoCode.findUnique({
      where: {
        id: promoCodeId,
      },
    });
    if (!promoCode) {
      throw new NotFoundException(
        `Promo code with id: ${promoCodeId} not found`,
      );
    }
    return promoCode;
  }
  async findByCode(code: string) {
    const normalizedCode = code.toUpperCase();
    const promoCode = await this.prisma.promoCode.findUnique({
      where: {
        code: normalizedCode,
      },
    });
    if (!promoCode) {
      throw new NotFoundException(`Promo code: ${code} not found`);
    }
    return promoCode;
  }
  async validateForCustomer(code: string) {
    const promoCode = await this.findByCode(code);
    const now = new Date();

    if (!promoCode.isActive) {
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

    return {
      code: promoCode.code,
      title: promoCode.title,
      type: promoCode.type,
      value: promoCode.value,
      expiresAt: promoCode.expiresAt,
    };
  }
  async toggleActivatePromoCode(code: string, isActive: boolean) {
    const normalizedCode = code.toUpperCase();
    await this.findByCode(normalizedCode);
    return this.prisma.promoCode.update({
      where: {
        code: normalizedCode,
      },
      data: {
        isActive: isActive,
      },
    });
  }
  async create(dto: CreatePromoCodeDto) {
    const { code } = dto;
    const normalizedCode = code.toUpperCase();
    const existPromoCode = await this.prisma.promoCode.findUnique({
      where: {
        code: normalizedCode,
      },
    });

    if (existPromoCode) {
      throw new BadRequestException(
        `Promo code '${normalizedCode}' already exists`,
      );
    }

    return this.prisma.promoCode.create({
      data: {
        ...dto,
        code: normalizedCode,
        expiresAt: !dto.expiresAt ? null : new Date(dto.expiresAt),
      },
    });
  }
}
