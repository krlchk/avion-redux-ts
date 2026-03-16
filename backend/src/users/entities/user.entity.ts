import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  isTwoFactorEnabled: boolean;

  @Exclude()
  password: string;
  @Exclude()
  resetOtpHash: string | null;
  @Exclude()
  resetOtpExpiresAt: Date | null;
  @Exclude()
  loginOtpHash: string | null;
  @Exclude()
  loginOtpExpiresAt: Date | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
