import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { ProductAssistantDto } from './dto/product-assistant.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('product-assistant')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  askProductAssistant(@Body() dto: ProductAssistantDto) {
    return this.aiService.askProductAssistant(dto.productId, dto.question);
  }
}
