import {
  Controller,
  Param,
  Post,
  UseGuards,
  Headers,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ConfirmOrderPaymentDto } from './dto/confrim-order-payments.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('intents/:orderId')
  @UseGuards(AuthGuard('jwt'))
  intents(@Param('orderId') orderId: string, @CurrentUser() user: UserEntity) {
    return this.paymentsService.createPaymentIntent(orderId, user.id);
  }

  @Post('confrim')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  confirm(
    @Body() dto: ConfirmOrderPaymentDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.paymentsService.confirmOrderPayment(
      dto.orderId,
      dto.paymentIntentId,
      user.id,
    );
  }
}
