import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, genSalt } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  // GET ALL USERS
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }
  // // GET USER PROFILE
  async getProfile(email: string) {
    const user = await this.findByEmail(email);
    return new UserEntity(user);
  }
  // GET USER BY ID
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with id:${id} not found`);
    }
    return new UserEntity(user);
  }
  // GET USER BY EMAIL
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`User with email:${email} not found`);
    }
    return new UserEntity(user);
  }
  // GET USER BY EMAIL FOR AUTH
  async findByEmailForAuth(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return null;
    }
    return user;
  }
  // CREATE USER
  async create(dto: CreateUserDto) {
    const salt = await genSalt();
    const hashedPassword = await hash(dto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: 'CUSTOMER',
      },
    });

    return new UserEntity(user);
  }
  // UPDATE USER
  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: dto,
    });
    return new UserEntity(user);
  }

  async updatePassword(id: string, newHash: string) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: { password: newHash },
    });

    return new UserEntity(updatedUser);
  }
  // SEND OTP
  async setResetOtp(email: string, expiresAt: Date, codeHash: string) {
    return this.prisma.user.update({
      where: { email: email },
      data: {
        resetOtpExpiresAt: expiresAt,
        resetOtpHash: codeHash,
      },
    });
  }
}
