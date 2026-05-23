import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class ProductAssistantDto {
  @IsUUID()
  productId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  question: string;
}
