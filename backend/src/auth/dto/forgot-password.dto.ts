import { IsNotEmpty, IsString } from 'class-validator';

export class forgotPasswordDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
