import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { OrderCleanUpService } from './order-cleanup.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, OrderCleanUpService],
  exports: [OrdersService],
})
export class OrdersModule {}
