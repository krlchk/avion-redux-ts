import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ToggleActivatePromoCode {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
