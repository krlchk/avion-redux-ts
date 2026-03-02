import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

enum ProductSortBy {
  CREATED_AT = 'createdAt',
  PRICE = 'price',
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class ProductsQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  minPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  maxPrice: number;

  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  inStock: boolean;

  @IsOptional()
  @IsEnum(ProductSortBy)
  sortBy: ProductSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder: SortOrder;

  @IsOptional()
  @IsUUID()
  designerId: string;
}
