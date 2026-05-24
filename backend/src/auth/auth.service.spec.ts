import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  const usersService = {
    findByEmailForAuth: jest.fn(),
    findById: jest.fn(),
    setTwoFactorEnabled: jest.fn(),
    set2FaOtp: jest.fn(),
    clearTwoFactorOtp: jest.fn(),
    setResetOtp: jest.fn(),
    updatePassword: jest.fn(),
    resetOtpStatus: jest.fn(),
  };

  const jwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const emailService = {
    send2FaOtp: jest.fn(),
    sendResetOtp: jest.fn(),
    sendPasswordChanged: jest.fn(),
  };

  const user: User = {
    id: 'user-1',
    name: 'Customer',
    email: 'customer@example.com',
    password: 'hashed-password',
    role: Role.CUSTOMER,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    resetOtpHash: null,
    resetOtpExpiresAt: null,
    isTwoFactorEnabled: false,
    loginOtpHash: null,
    loginOtpExpiresAt: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    service = new AuthService(
      usersService as unknown as UsersService,
      jwtService as unknown as JwtService,
      emailService as unknown as EmailService,
    );
    jest.mocked(compare).mockResolvedValue(true as never);
    jest.mocked(genSalt).mockResolvedValue('salt' as never);
    jest.mocked(hash).mockResolvedValue('hashed-value' as never);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user and return user entity when password matches', async () => {
    usersService.findByEmailForAuth.mockResolvedValue(user);
    jest.mocked(compare).mockResolvedValue(true as never);

    const result = await service.validateUser(
      'customer@example.com',
      'password',
    );

    expect(usersService.findByEmailForAuth).toHaveBeenCalledWith(
      'customer@example.com',
    );
    expect(compare).toHaveBeenCalledWith('password', 'hashed-password');
    expect(result).toBeInstanceOf(UserEntity);
    expect(result).toEqual(expect.objectContaining({ id: 'user-1' }));
  });

  it('should return null when validating missing user', async () => {
    usersService.findByEmailForAuth.mockResolvedValue(null);

    await expect(
      service.validateUser('missing@example.com', 'password'),
    ).resolves.toBeNull();
    expect(compare).not.toHaveBeenCalled();
  });

  it('should return null when password does not match', async () => {
    usersService.findByEmailForAuth.mockResolvedValue(user);
    jest.mocked(compare).mockResolvedValue(false as never);

    await expect(
      service.validateUser('customer@example.com', 'wrong-password'),
    ).resolves.toBeNull();
  });

  it('should toggle two-factor state after checking user exists', async () => {
    usersService.findById.mockResolvedValue(new UserEntity(user));
    usersService.setTwoFactorEnabled.mockResolvedValue({
      ...user,
      isTwoFactorEnabled: true,
    });

    await service.toggleTwoFactor(true, 'user-1');

    expect(usersService.findById).toHaveBeenCalledWith('user-1');
    expect(usersService.setTwoFactorEnabled).toHaveBeenCalledWith(
      'user-1',
      true,
    );
  });

  it('should return access token if 2FA is disabled', async () => {
    jwtService.sign.mockReturnValue('access-token');

    await expect(service.login(user)).resolves.toEqual({
      token: 'access-token',
    });
    expect(jwtService.sign).toHaveBeenCalledWith({
      email: 'customer@example.com',
      sub: 'user-1',
      role: Role.CUSTOMER,
    });
    expect(emailService.send2FaOtp).not.toHaveBeenCalled();
  });

  it('should return temp token and send OTP if 2FA is enabled', async () => {
    const sendTwoFactorOtpSpy = jest
      .spyOn(service, 'sendTwoFactorOtp')
      .mockResolvedValue(undefined);
    jwtService.sign.mockReturnValue('temp-token');

    await expect(
      service.login({ ...user, isTwoFactorEnabled: true }),
    ).resolves.toEqual({
      requiresTwoFactor: true,
      tempToken: 'temp-token',
    });
    expect(sendTwoFactorOtpSpy).toHaveBeenCalledWith(
      'user-1',
      'customer@example.com',
    );
    expect(jwtService.sign).toHaveBeenCalledWith(
      { sub: 'user-1', type: '2fa_temp' },
      { expiresIn: '10m' },
    );
  });

  it('should send two-factor OTP email and store hashed OTP', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);

    await service.sendTwoFactorOtp('user-1', 'customer@example.com');

    expect(genSalt).toHaveBeenCalled();
    expect(hash).toHaveBeenCalledWith('100000', 'salt');
    expect(usersService.set2FaOtp).toHaveBeenCalledWith(
      'user-1',
      expect.any(Date),
      'hashed-value',
    );
    expect(emailService.send2FaOtp).toHaveBeenCalledWith(
      'customer@example.com',
      '100000',
    );
  });

  it('should verify 2FA and return access token', async () => {
    jwtService.verify.mockReturnValue({ sub: 'user-1', type: '2fa_temp' });
    jwtService.sign.mockReturnValue('access-token');
    usersService.findById.mockResolvedValue(
      new UserEntity({
        ...user,
        loginOtpHash: 'otp-hash',
        loginOtpExpiresAt: new Date(Date.now() + 60_000),
      }),
    );
    jest.mocked(compare).mockResolvedValue(true as never);

    await expect(
      service.verifyTwoFactor('temp-token', '123456'),
    ).resolves.toEqual({
      token: 'access-token',
    });
    expect(compare).toHaveBeenCalledWith('123456', 'otp-hash');
    expect(usersService.clearTwoFactorOtp).toHaveBeenCalledWith('user-1');
  });

  it('should reject 2FA verification when token is invalid', async () => {
    jwtService.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await expect(
      service.verifyTwoFactor('bad-token', '123456'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject 2FA verification when token type is invalid', async () => {
    jwtService.verify.mockReturnValue({
      sub: 'user-1',
      type: 'password_reset',
    });

    await expect(
      service.verifyTwoFactor('temp-token', '123456'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject 2FA verification when OTP session is missing', async () => {
    jwtService.verify.mockReturnValue({ sub: 'user-1', type: '2fa_temp' });
    usersService.findById.mockResolvedValue(new UserEntity(user));

    await expect(
      service.verifyTwoFactor('temp-token', '123456'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject 2FA verification when OTP is expired', async () => {
    jwtService.verify.mockReturnValue({ sub: 'user-1', type: '2fa_temp' });
    usersService.findById.mockResolvedValue(
      new UserEntity({
        ...user,
        loginOtpHash: 'otp-hash',
        loginOtpExpiresAt: new Date(Date.now() - 60_000),
      }),
    );

    await expect(
      service.verifyTwoFactor('temp-token', '123456'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject 2FA verification when OTP is invalid', async () => {
    jwtService.verify.mockReturnValue({ sub: 'user-1', type: '2fa_temp' });
    usersService.findById.mockResolvedValue(
      new UserEntity({
        ...user,
        loginOtpHash: 'otp-hash',
        loginOtpExpiresAt: new Date(Date.now() + 60_000),
      }),
    );
    jest.mocked(compare).mockResolvedValue(false as never);

    await expect(
      service.verifyTwoFactor('temp-token', '123456'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should send reset OTP for existing user', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    usersService.findByEmailForAuth.mockResolvedValue(user);

    await expect(
      service.forgotPassword('customer@example.com'),
    ).resolves.toEqual({ message: 'OTP sent' });
    expect(usersService.setResetOtp).toHaveBeenCalledWith(
      'customer@example.com',
      expect.any(Date),
      'hashed-value',
    );
    expect(emailService.sendResetOtp).toHaveBeenCalledWith(
      'customer@example.com',
      '100000',
    );
  });

  it('should not reveal missing user in forgot password flow', async () => {
    usersService.findByEmailForAuth.mockResolvedValue(null);

    await expect(
      service.forgotPassword('missing@example.com'),
    ).resolves.toEqual({ message: 'OTP sent' });
    expect(usersService.setResetOtp).not.toHaveBeenCalled();
    expect(emailService.sendResetOtp).not.toHaveBeenCalled();
  });

  it('should verify password reset OTP and return reset token', async () => {
    usersService.findByEmailForAuth.mockResolvedValue({
      ...user,
      resetOtpHash: 'otp-hash',
      resetOtpExpiresAt: new Date(Date.now() + 60_000),
    });
    jwtService.sign.mockReturnValue('reset-token');

    await expect(
      service.verifyOtp('customer@example.com', '123456'),
    ).resolves.toEqual({ resetToken: 'reset-token' });
    expect(compare).toHaveBeenCalledWith('123456', 'otp-hash');
    expect(jwtService.sign).toHaveBeenCalledWith(
      { sub: 'user-1', type: 'password_reset' },
      { expiresIn: '10m' },
    );
  });

  it('should reject password reset OTP when session is missing', async () => {
    usersService.findByEmailForAuth.mockResolvedValue(user);

    await expect(
      service.verifyOtp('customer@example.com', '123456'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject password reset OTP when expired', async () => {
    usersService.findByEmailForAuth.mockResolvedValue({
      ...user,
      resetOtpHash: 'otp-hash',
      resetOtpExpiresAt: new Date(Date.now() - 60_000),
    });

    await expect(
      service.verifyOtp('customer@example.com', '123456'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject password reset OTP when invalid', async () => {
    usersService.findByEmailForAuth.mockResolvedValue({
      ...user,
      resetOtpHash: 'otp-hash',
      resetOtpExpiresAt: new Date(Date.now() + 60_000),
    });
    jest.mocked(compare).mockResolvedValue(false as never);

    await expect(
      service.verifyOtp('customer@example.com', '123456'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reset password with valid reset token', async () => {
    jwtService.verify.mockReturnValue({
      sub: 'user-1',
      type: 'password_reset',
    });
    usersService.findById.mockResolvedValue(
      new UserEntity({
        ...user,
        resetOtpHash: 'otp-hash',
        resetOtpExpiresAt: new Date(Date.now() + 60_000),
      }),
    );

    await expect(
      service.resetPassword('reset-token', 'new-password'),
    ).resolves.toEqual({
      message: 'Password successfully reset',
    });
    expect(hash).toHaveBeenCalledWith('new-password', 'salt');
    expect(usersService.updatePassword).toHaveBeenCalledWith(
      'user-1',
      'hashed-value',
    );
    expect(usersService.resetOtpStatus).toHaveBeenCalledWith('user-1');
    expect(emailService.sendPasswordChanged).toHaveBeenCalledWith(
      'customer@example.com',
    );
  });

  it('should reject password reset when token is invalid', async () => {
    jwtService.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await expect(
      service.resetPassword('bad-token', 'new-password'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject password reset when token type is invalid', async () => {
    jwtService.verify.mockReturnValue({ sub: 'user-1', type: '2fa_temp' });

    await expect(
      service.resetPassword('reset-token', 'new-password'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject password reset when reset session is missing', async () => {
    jwtService.verify.mockReturnValue({
      sub: 'user-1',
      type: 'password_reset',
    });
    usersService.findById.mockResolvedValue(new UserEntity(user));

    await expect(
      service.resetPassword('reset-token', 'new-password'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject password reset when reset session is expired', async () => {
    jwtService.verify.mockReturnValue({
      sub: 'user-1',
      type: 'password_reset',
    });
    usersService.findById.mockResolvedValue(
      new UserEntity({
        ...user,
        resetOtpHash: 'otp-hash',
        resetOtpExpiresAt: new Date(Date.now() - 60_000),
      }),
    );

    await expect(
      service.resetPassword('reset-token', 'new-password'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
