import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllReviews() {
    const data = await this.prisma.review.findMany();
    return {
      data,
    };
  }
  //GET PRODUCT REVIEW
  async getReviews(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with id: ${productId} not found`);
    }
    const reviews = await this.prisma.review.findMany({
      where: { productId: product.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const aggregations = await this.prisma.review.aggregate({
      where: { productId: product.id },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    return {
      data: reviews,
      meta: {
        averageRating: aggregations._avg.rating ?? 0,
        reviewsCount: aggregations._count.rating ?? 0,
      },
    };
  }
  //CREATE REVIEW
  async create(dto: CreateReviewDto, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) {
      throw new NotFoundException(
        `Product with id: ${dto.productId} not found`,
      );
    }

    const ordersWithProduct = await this.prisma.order.findFirst({
      where: {
        userId: userId,
        status: 'PAID',
        items: {
          some: { productId: dto.productId },
        },
      },
    });

    if (!ordersWithProduct) {
      throw new ForbiddenException(
        'You cannot leave a review for a product you have not purchased',
      );
    }

    if (ordersWithProduct.userId === userId) {
      throw new BadRequestException('You already left review on this product');
    }

    return this.prisma.review.create({
      data: {
        ...dto,
        userId: userId,
      },
    });
  }
  //DELETE REVIEW
  async delete(reviewId: string, user: UserEntity) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!review) {
      throw new NotFoundException(`Review with id: ${reviewId} not found`);
    }
    if (user.role !== 'ADMIN' && user.id !== review.userId) {
      throw new ForbiddenException(
        'Only admin or review creator can delete this review',
      );
    }
    return this.prisma.review.delete({ where: { id: reviewId } });
  }
}
