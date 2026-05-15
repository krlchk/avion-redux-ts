import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { NewsletterSubscriptionDto } from './dto/newsletter-subscription.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('newsletter')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async subscribeNewsletter(@Body() dto: NewsletterSubscriptionDto) {
    await this.emailService.sendNewsletterSubscription(dto.email);
    return { message: 'Newsletter email sent' };
  }
}
