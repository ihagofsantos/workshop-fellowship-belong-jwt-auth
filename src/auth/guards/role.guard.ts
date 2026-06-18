import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../decorators/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { User } from 'src/users/users.repository';
import { Reflector } from '@nestjs/core';

export class RolesGuard implements CanActivate {
  constructor(
    @Inject()
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request: { user: User } = context.switchToHttp().getRequest();
    const user: User = request.user;

    const userAuthorized = requiredRoles.includes(user.role);

    if (!userAuthorized) {
      throw new UnauthorizedException(
        `User with role ${user.role} is not authorized to access this resource`,
      );
    }

    return true;
  }
}
