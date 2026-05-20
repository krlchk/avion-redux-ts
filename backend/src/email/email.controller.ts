import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { NewsletterSubscriptionDto } from './dto/newsletter-subscription.dto';
import { ContactMessageDto } from './dto/contact-message.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('newsletter')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async subscribeNewsletter(@Body() dto: NewsletterSubscriptionDto) {
    await this.emailService.sendNewsletterSubscription(dto.email);
    return { message: 'Newsletter email sent' };
  }

  @Post('contact')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async sendContactMessage(@Body() dto: ContactMessageDto) {
    await this.emailService.sendContactMessage(dto);
    return { message: 'Contact message sent' };
  }
}
