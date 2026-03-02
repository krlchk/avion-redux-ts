import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { verifyOtpDto } from './dto/verify-otp.dto';
import { resetPasswordDto } from './dto/reset-password.dto';
import { hash, genSalt } from 'bcrypt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmailForAuth(email);
    if (!user) {
      return null;
    }
    const isPassword = await compare(password, user.password);
    if (!isPassword) {
      return null;
    }
    return new UserEntity(user);
  }

  login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  async forgotPassword(dto: forgotPasswordDto) {
    const email = dto.email;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await this.userService.findByEmailForAuth(email);
    if (!user) {
      return { message: 'OTP sent' };
    }
    const salt = await genSalt();
    const codeHash = await hash(code, salt);

    await this.userService.setResetOtp(user.id, expires, codeHash);
    await this.emailService.sendResetOtp(email, code);
    return { message: 'OTP sent' };
  }
  verifyOtp(dto: verifyOtpDto) {}
  resetPassword(dto: resetPasswordDto) {}
}
