import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class ContactMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[+()\-\s\d]{7,20}$/)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  message: string;
}
