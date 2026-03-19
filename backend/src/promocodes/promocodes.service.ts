import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePromoCodeDto } from './dto/create-promocode.dto';

@Injectable()
export class PromocodesService {
  constructor(private readonly prisma: PrismaService) {}
  getAll() {
    return this.prisma.promoCode.findMany({ orderBy: { createdAt: 'desc' } });
  }
  create(dto: CreatePromoCodeDto) {
    const { code } = dto;
    const upperCode = code.toUpperCase();

    return this.prisma.promoCode.create({
      data: {
        ...dto,
        code: upperCode,
        expiresAt: !dto.expiresAt ? null : new Date(dto.expiresAt),
      },
    });
  }
}
