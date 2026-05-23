import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmOrderPaymentDto {
  @IsString()
  @IsNotEmpty()
  paymentIntentId: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;
}
