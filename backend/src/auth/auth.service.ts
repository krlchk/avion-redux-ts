import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { EmailService } from 'src/email/email.service';

interface PasswordResetPayload {
  sub: string;
  type: 'password_reset';
  iat?: number;
  exp?: number;
}

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
  async forgotPassword(dto: ForgotPasswordDto) {
    const { email } = dto;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await this.userService.findByEmailForAuth(email);
    if (!user) {
      return { message: 'OTP sent' };
    }
    const salt = await genSalt();
    const otpHash = await hash(otp, salt);

    await this.userService.setResetOtp(user.email, expires, otpHash);
    await this.emailService.sendResetOtp(email, otp);
    return { message: 'OTP sent' };
  }
  async verifyOtp(dto: VerifyOtpDto) {
    const { email, otp } = dto;
    const user = await this.userService.findByEmailForAuth(email);
    const timeNow = new Date();
    if (!user || !user.resetOtpExpiresAt || !user.resetOtpHash) {
      throw new BadRequestException('Invalid Otp');
    }
    if (timeNow.getTime() > user.resetOtpExpiresAt.getTime()) {
      throw new BadRequestException('OTP expired');
    }
    const isValid = await compare(otp, user.resetOtpHash);
    if (!isValid) {
      throw new BadRequestException('Invalid OTP');
    }
    const payload = { sub: user.id, type: 'password_reset' };
    const signOptions: JwtSignOptions = {
      expiresIn: '10m',
    };
    const resetToken = this.jwtService.sign(payload, signOptions);
    return { resetToken };
  }
  async resetPassword(dto: ResetPasswordDto) {
    const { resetToken, newPassword } = dto;
    let decode: PasswordResetPayload;
    try {
      decode = this.jwtService.verify<PasswordResetPayload>(resetToken);
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
    if (decode.type !== 'password_reset') {
      throw new BadRequestException('Invalid token type');
    }
    const user = await this.userService.findById(decode.sub);

    const salt = await genSalt();
    const newPaswordHash = await hash(newPassword, salt);

    await this.userService.updatePassword(user.id, newPaswordHash);
    await this.userService.resetOtpStatus(user.id);
    return { message: 'Password successfully reset' };
  }
}
