import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;

  const prisma = {
    user: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const emailService = {
    welcomeRegistration: jest.fn(),
  };

  const user = {
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

  const admin = new UserEntity({
    ...user,
    id: 'admin-1',
    role: Role.ADMIN,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prisma },
        { provide: EmailService, useValue: emailService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
    jest.mocked(genSalt).mockResolvedValue('salt' as never);
    jest.mocked(hash).mockResolvedValue('new-hash' as never);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users as entities', async () => {
    prisma.user.findMany.mockResolvedValue([user]);

    const result = await service.findAll();

    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toBeInstanceOf(UserEntity);
    expect(result.data[0]).toEqual(expect.objectContaining({ id: 'user-1' }));
  });

  it('should return designers with products count', async () => {
    prisma.user.findMany.mockResolvedValue([
      { id: 'designer-1', name: 'Designer', _count: { products: 3 } },
    ]);

    await expect(service.findDesigners()).resolves.toEqual({
      data: [{ id: 'designer-1', name: 'Designer', productsCount: 3 }],
    });
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      where: { role: 'DESIGNER' },
      select: {
        id: true,
        name: true,
        _count: { select: { products: true } },
      },
    });
  });

  it('should return designer by id with products count', async () => {
    prisma.user.findFirst.mockResolvedValue({
      id: 'designer-1',
      name: 'Designer',
      _count: { products: 2 },
    });

    await expect(service.findDesignerById('designer-1')).resolves.toEqual({
      id: 'designer-1',
      name: 'Designer',
      productsCount: 2,
    });
  });

  it('should reject when designer by id is not found', async () => {
    prisma.user.findFirst.mockResolvedValue(null);

    await expect(service.findDesignerById('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should return profile by email', async () => {
    prisma.user.findUnique.mockResolvedValue(user);

    const result = await service.getProfile('customer@example.com');

    expect(result).toBeInstanceOf(UserEntity);
    expect(result).toEqual(expect.objectContaining({ id: 'user-1' }));
  });

  it('should return user by id', async () => {
    prisma.user.findUnique.mockResolvedValue(user);

    await expect(service.findById('user-1')).resolves.toEqual(
      expect.objectContaining({ id: 'user-1' }),
    );
  });

  it('should reject when user by id is not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(service.findById('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should return user by email', async () => {
    prisma.user.findUnique.mockResolvedValue(user);

    await expect(service.findByEmail('customer@example.com')).resolves.toEqual(
      expect.objectContaining({ email: 'customer@example.com' }),
    );
  });

  it('should return null when user by email for auth is not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(
      service.findByEmailForAuth('missing@example.com'),
    ).resolves.toBeNull();
  });

  it('should create customer, hash password and send welcome email', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      ...user,
      password: 'new-hash',
    });

    const result = await service.create(
      'Customer',
      'customer@example.com',
      'password',
    );

    expect(genSalt).toHaveBeenCalled();
    expect(hash).toHaveBeenCalledWith('password', 'salt');
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Customer',
        email: 'customer@example.com',
        password: 'new-hash',
        role: 'CUSTOMER',
      },
    });
    expect(emailService.welcomeRegistration).toHaveBeenCalledWith(
      'customer@example.com',
      'Customer',
    );
    expect(result).toBeInstanceOf(UserEntity);
  });

  it('should reject creating duplicate user', async () => {
    prisma.user.findUnique.mockResolvedValue(user);

    await expect(
      service.create('Customer', 'customer@example.com', 'password'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it('should allow admin to update another user', async () => {
    prisma.user.update.mockResolvedValue({ ...user, name: 'Updated' });

    await expect(
      service.update('user-1', { name: 'Updated' }, admin),
    ).resolves.toEqual(expect.objectContaining({ name: 'Updated' }));
  });

  it('should allow user to update own profile', async () => {
    prisma.user.update.mockResolvedValue({ ...user, name: 'Updated' });

    await expect(
      service.update('user-1', { name: 'Updated' }, new UserEntity(user)),
    ).resolves.toEqual(expect.objectContaining({ name: 'Updated' }));
  });

  it('should reject user update for another customer', async () => {
    await expect(
      service.update('another-user', { name: 'Updated' }, new UserEntity(user)),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('should reset otp status', async () => {
    prisma.user.update.mockResolvedValue(user);

    await service.resetOtpStatus('user-1');

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: {
        resetOtpExpiresAt: null,
        resetOtpHash: null,
      },
    });
  });

  it('should update password', async () => {
    prisma.user.update.mockResolvedValue({ ...user, password: 'new-hash' });

    await service.updatePassword('user-1', 'new-hash');

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { password: 'new-hash' },
    });
  });

  it('should set reset otp', async () => {
    const expiresAt = new Date('2026-01-01T00:10:00.000Z');
    prisma.user.update.mockResolvedValue({
      ...user,
      resetOtpHash: 'otp-hash',
      resetOtpExpiresAt: expiresAt,
    });

    await service.setResetOtp('customer@example.com', expiresAt, 'otp-hash');

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { email: 'customer@example.com' },
      data: {
        resetOtpExpiresAt: expiresAt,
        resetOtpHash: 'otp-hash',
      },
    });
  });

  it('should set two-factor enabled state', async () => {
    prisma.user.update.mockResolvedValue({ ...user, isTwoFactorEnabled: true });

    await service.setTwoFactorEnabled('user-1', true);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { isTwoFactorEnabled: true },
    });
  });

  it('should set 2FA otp', async () => {
    const expiresAt = new Date('2026-01-01T00:10:00.000Z');
    prisma.user.update.mockResolvedValue({
      ...user,
      loginOtpHash: 'otp-hash',
      loginOtpExpiresAt: expiresAt,
    });

    await service.set2FaOtp('user-1', expiresAt, 'otp-hash');

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: {
        loginOtpExpiresAt: expiresAt,
        loginOtpHash: 'otp-hash',
      },
    });
  });

  it('should clear 2FA otp', async () => {
    prisma.user.update.mockResolvedValue(user);

    await service.clearTwoFactorOtp('user-1');

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: {
        loginOtpExpiresAt: null,
        loginOtpHash: null,
      },
    });
  });
});
