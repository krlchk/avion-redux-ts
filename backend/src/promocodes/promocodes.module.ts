import { Module } from '@nestjs/common';
import { PromocodesService } from './promocodes.service';
import { PromocodesController } from './promocodes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PromocodesController],
  providers: [PromocodesService, PrismaService],
})
export class PromocodesModule {}
