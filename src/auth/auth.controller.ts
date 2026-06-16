import { Body, Controller, Post } from '@nestjs/common';
import { AccessToken, AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dtos/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() singInDTO: SignInDTO): Promise<AccessToken> {
    return this.authService.signIn(singInDTO.username, singInDTO.password);
  }
}
