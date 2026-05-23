import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  getAllReviews() {
    return this.reviewsService.getAllReviews();
  }

  @Get('/product/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  getReviews(@Param('id', ParseUUIDPipe) productId: string) {
    return this.reviewsService.getReviews(productId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() dto: CreateReviewDto, @CurrentUser() user: UserEntity) {
    return this.reviewsService.create(dto, user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(
    @Param('id', ParseUUIDPipe) reviewId: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.reviewsService.delete(reviewId, user);
  }
}
