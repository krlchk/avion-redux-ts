import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePromoCodeDto } from './dto/create-promocode.dto';
import { ToggleActivatePromoCode } from './dto/toggle-activate-promocode.dto';

@Injectable()
export class PromocodesService {
  constructor(private readonly prisma: PrismaService) {}
  getAll() {
    return this.prisma.promoCode.findMany({ orderBy: { createdAt: 'desc' } });
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
  async toggleActivatePromoCode(dto: ToggleActivatePromoCode) {
    const { code, isActive } = dto;
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
  create(dto: CreatePromoCodeDto) {
    const { code } = dto;
    const normalizedCode = code.toUpperCase();

    return this.prisma.promoCode.create({
      data: {
        ...dto,
        code: normalizedCode,
        expiresAt: !dto.expiresAt ? null : new Date(dto.expiresAt),
      },
    });
  }
}
