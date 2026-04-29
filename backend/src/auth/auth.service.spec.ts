import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = {
    findByEmailForAuth: jest.fn(),
    findById: jest.fn(),
    setTwoFactorEnabled: jest.fn(),
    set2FaOtp: jest.fn(),
    clearTwoFactorOtp: jest.fn(),
    setResetOtp: jest.fn(),
    updatePassword: jest.fn(),
    resetOtpStatus: jest.fn(),
  };
  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };
  const mockEmailService = {
    send2FaOtp: jest.fn(),
    sendResetOtp: jest.fn(),
    sendPasswordChanged: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });
  it('it should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return access token if 2FA is disabled', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = {
      id: 'user-1',
      email: 'test@example.com',
      role: 'CUSTOMER',
      isTwoFactorEnabled: false,
    } as any;

    mockJwtService.sign.mockReturnValue('mock-access-token');
    const result = await service.login(user);

    expect(result).toEqual({
      token: 'mock-access-token',
    });

    expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
    expect(mockEmailService.send2FaOtp).not.toHaveBeenCalled();
  });
  it('should return temp token and require 2FA if 2FA is enabled', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = {
      id: 'user-1',
      email: 'test@example.com',
      role: 'CUSTOMER',
      isTwoFactorEnabled: true,
    } as any;

    jest.spyOn(service, 'sendTwoFactorOtp').mockResolvedValue(undefined);
    mockJwtService.sign.mockReturnValue('mock-temp-token');

    const result = await service.login(user);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.sendTwoFactorOtp).toHaveBeenCalledWith(
      'user-1',
      'test@example.com',
    );

    expect(result).toEqual({
      requiresTwoFactor: true,
      tempToken: 'mock-temp-token',
    });
  });
});
