import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  img: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  width: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  height: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  depth: number;

  @IsString()
  @IsNotEmpty()
  designerId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
