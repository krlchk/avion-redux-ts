import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { hash, genSalt, compare } from 'bcrypt';
import { EmailService } from 'src/email/email.service';

interface PasswordResetPayload {
  sub: string;
  type: 'password_reset';
  iat?: number;
  exp?: number;
}
interface TwoFactorPayload {
  sub: string;
  type: '2fa_temp';
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

  async toggleTwoFactor(enabled: boolean, userId: string) {
    await this.userService.findById(userId);
    return this.userService.setTwoFactorEnabled(userId, enabled);
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    const tempTokenPayload: TwoFactorPayload = {
      sub: user.id,
      type: '2fa_temp',
    };

    if (!user.isTwoFactorEnabled) {
      return {
        token: this.jwtService.sign(payload),
      };
    }
    await this.sendTwoFactorOtp(user.id, user.email);
    return {
      requiresTwoFactor: true,
      tempToken: this.jwtService.sign(tempTokenPayload, { expiresIn: '10m' }),
    };
  }
  async sendTwoFactorOtp(userId: string, email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    const salt = await genSalt();
    const otpHash = await hash(otp, salt);

    await this.userService.set2FaOtp(userId, expires, otpHash);
    await this.emailService.send2FaOtp(email, otp);
  }
  async verifyTwoFactor(tempToken: string, otp: string) {
    let decode: TwoFactorPayload;
    try {
      decode = this.jwtService.verify<TwoFactorPayload>(tempToken);
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
    if (decode.type !== '2fa_temp') {
      throw new BadRequestException('Invalid token type');
    }
    const user = await this.userService.findById(decode.sub);
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    if (!user.loginOtpExpiresAt || !user.loginOtpHash) {
      throw new BadRequestException('Invalid Otp');
    }
    if (
      user.loginOtpExpiresAt &&
      Date.now() > user.loginOtpExpiresAt.getTime()
    ) {
      throw new BadRequestException('Login session expired');
    }
    const isValid = await compare(otp, user.loginOtpHash);
    if (!isValid) {
      throw new BadRequestException('Invalid Otp');
    }
    await this.userService.clearTwoFactorOtp(user.id);
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string) {
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
  async verifyOtp(email: string, otp: string) {
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
      throw new BadRequestException('Invalid Otp');
    }
    const payload = { sub: user.id, type: 'password_reset' };
    const signOptions: JwtSignOptions = {
      expiresIn: '10m',
    };
    const resetToken = this.jwtService.sign(payload, signOptions);
    if (!resetToken) {
      throw new BadRequestException('Error with reset token');
    }
    return { resetToken };
  }
  async resetPassword(resetToken: string, newPassword: string) {
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

    if (!user.resetOtpExpiresAt || !user.resetOtpHash) {
      throw new BadRequestException('Reset session expired');
    }
    if (
      user.resetOtpExpiresAt &&
      Date.now() > user.resetOtpExpiresAt.getTime()
    ) {
      throw new BadRequestException('Reset session expired');
    }

    const salt = await genSalt();
    const newPasswordHash = await hash(newPassword, salt);

    await this.userService.updatePassword(user.id, newPasswordHash);
    await this.userService.resetOtpStatus(user.id);
    await this.emailService.sendPasswordChanged(user.email);
    return { message: 'Password successfully reset' };
  }
}
