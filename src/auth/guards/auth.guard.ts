import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject()
    private readonly jwtService: JwtService,
    @Inject()
    private readonly usersService: UsersService,
  ) {}

  private extractTokenFromHeaders(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []; // {authorization: "Bearer ashdfaiusgdaiusgdiuasgd...." }

    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Record<string, unknown> = context
      .switchToHttp()
      .getRequest();
    const token = this.extractTokenFromHeaders(request);

    if (!token) throw new UnauthorizedException(); // 401
    try {
      const payload: Record<string, number> =
        await this.jwtService.verifyAsync(token);
      console.log('payload', payload);
      const user = await this.usersService.findById(payload.sub);

      if (!user) throw new UnauthorizedException();

      request['user'] = {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      };

      return true;
    } catch (error) {
      console.error('[AuthGuard] [canActivate] error', error);
      throw new UnauthorizedException();
    }
  }
}
