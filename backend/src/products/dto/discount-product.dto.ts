import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class DiscountProductDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @Max(90)
  discountPercent?: number;

  @IsDateString()
  @IsOptional()
  discountUntil?: string;
}
