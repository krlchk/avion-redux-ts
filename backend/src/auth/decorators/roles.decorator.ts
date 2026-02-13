import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const Roles = (...roles: Role[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
