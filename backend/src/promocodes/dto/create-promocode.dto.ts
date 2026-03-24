import { PromoCodeType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePromoCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(PromoCodeType)
  type: PromoCodeType;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  value: number;

  @IsDateString()
  @IsOptional()
  expiresAt?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  maxUses?: number;
}
