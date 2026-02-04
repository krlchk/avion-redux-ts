import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, genSalt } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  // GET ALL USERS
  findAll() {
    return this.prisma.user.findMany();
  }
  // GET USER BY ID
  async getById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with id:${id} not found`);
    }
    delete (user as any).password;
    return user;
  }
  // GET USER BY EMAIL
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`User with email:${email} not found`);
    }
    delete (user as any).password;
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

    delete (user as any).password;
    return user;
  }
  // UPDATE USER
  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: dto,
    });
    delete (user as any).password;
    return user;
  }

  async updatePassword(id: string, newHash: string) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: { password: newHash },
    });
  }
}
