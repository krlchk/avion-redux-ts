import { IsNotEmpty, IsString } from 'class-validator';

export class verifyOtpDto {
  @IsString()
  @IsNotEmpty()
  otpCode: string;
}
