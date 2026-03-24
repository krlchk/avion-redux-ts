import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/current-user.decorator';
import type { User } from '@prisma/client';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ToggleTwoFactorDto } from './dto/toggle-two-factor.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Verify2FaOtpDto } from './dto/verify-two-fa.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }
  @Patch('/me/2fa')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  toggleTwoFactor(
    @Body() dto: ToggleTwoFactorDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.authService.toggleTwoFactor(dto.enabled, user.id);
  }

  @Post('/2fa/verify')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  verifyTwoFactor(@Body() dto: Verify2FaOtpDto) {
    return this.authService.verifyTwoFactor(dto.tempToken, dto.otp);
  }

  @Post('/password/forgot')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('/password/verify')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto.email, dto.otp);
  }

  @Post('/password/reset')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.resetToken, dto.newPassword);
  }
}
