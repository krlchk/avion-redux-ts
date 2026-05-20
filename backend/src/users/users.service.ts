import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash, genSalt } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}
  async findAll() {
    const users = await this.prisma.user.findMany();
    const data = users.map((user) => new UserEntity(user));
    return {
      data,
    };
  }
  async findDesigners() {
    const designers = await this.prisma.user.findMany({
      where: {
        role: 'DESIGNER',
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    const data = designers.map((designer) => ({
      id: designer.id,
      name: designer.name,
      productsCount: designer._count.products,
    }));

    return { data };
  }
  async findDesignerById(id: string) {
    const designer = await this.prisma.user.findFirst({
      where: {
        id,
        role: 'DESIGNER',
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    if (!designer) {
      throw new NotFoundException(`Designer with id:${id} not found`);
    }

    return {
      id: designer.id,
      name: designer.name,
      productsCount: designer._count.products,
    };
  }
  async getProfile(email: string) {
    const user = await this.findByEmail(email);
    return new UserEntity(user);
  }
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with id:${id} not found`);
    }
    return new UserEntity(user);
  }
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`User with email:${email} not found`);
    }
    return new UserEntity(user);
  }
  async findByEmailForAuth(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return null;
    }
    return user;
  }
  async create(name: string, email: string, password: string) {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      throw new BadRequestException(
        `User with email '${email}' already exists`,
      );
    }

    const user = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: 'CUSTOMER',
      },
    });

    await this.emailService.welcomeRegistration(email, name);

    return new UserEntity(user);
  }
  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: dto,
    });
    return new UserEntity(user);
  }
  async resetOtpStatus(id: string) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: {
        resetOtpExpiresAt: null,
        resetOtpHash: null,
      },
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
  async setResetOtp(email: string, expiresAt: Date, codeHash: string) {
    return this.prisma.user.update({
      where: { email: email },
      data: {
        resetOtpExpiresAt: expiresAt,
        resetOtpHash: codeHash,
      },
    });
  }

  setTwoFactorEnabled(userId: string, enabled: boolean) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isTwoFactorEnabled: enabled,
      },
    });
  }

  set2FaOtp(userId: string, expiresAt: Date, codeHash: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        loginOtpExpiresAt: expiresAt,
        loginOtpHash: codeHash,
      },
    });
  }

  async clearTwoFactorOtp(id: string) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: {
        loginOtpExpiresAt: null,
        loginOtpHash: null,
      },
    });
    return new UserEntity(user);
  }
}
