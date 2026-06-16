import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';
import { UsersService } from 'src/users/users.service';

export type AccessToken = {
    access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private readonly userService: UsersService,
    @Inject()
    private jwtService: JwtService,
    @Inject()
    private readonly cryptoService: CryptoService,
  ) {}

  async signIn(username: string, password: string): Promise<AccessToken> {
    const user = await this.userService.findByUsername(username);

    if(!user) throw new UnauthorizedException();

    if(!user.password) throw new UnauthorizedException();

    if(!this.cryptoService.compare(password, user.password)) {
        throw new UnauthorizedException();
    }

    const payload = {
        sub: user.id,
        iat: Date.now(),
    }

    return {
        access_token: await this.jwtService.signAsync(payload),
    }
  }
}
