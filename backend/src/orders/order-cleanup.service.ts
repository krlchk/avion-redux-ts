import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderCleanUpService {
  constructor(private readonly prisma: PrismaService) {}
  @Cron('*/1 * * * *')
  async cleanupExpiredOrders() {
    const cutoffDate = new Date(Date.now() - 30 * 60000);
    const orders = await this.prisma.order.findMany({
      where: { status: 'PENDING', createdAt: { lt: cutoffDate } },
      include: { items: true },
    });

    await this.prisma.$transaction(async (tx) => {
      for (const o of orders) {
        const result = await tx.order.updateMany({
          where: { id: o.id, status: 'PENDING' },
          data: {
            status: 'CANCELLED',
          },
        });
        if (result.count === 0) {
          return;
        }

        for (const item of o.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }
      }
    });
  }
}
