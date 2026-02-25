import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('intents/:orderId')
  @UseGuards(AuthGuard('jwt'))
  intents(@Param('orderId') orderId: string, @CurrentUser() user: UserEntity) {
    return this.paymentsService.createPaymentIntent(orderId, user.id);
  }
}
