import {
  Controller,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
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

  @Post('stripe/webhook')
  @HttpCode(200)
  async handleStripeWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    await this.paymentsService.handleWebhook(req, signature);
    return { recieved: true };
  }
}
