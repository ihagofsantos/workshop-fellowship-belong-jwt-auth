import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccessToken, AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dtos/signIn.dto';
import { User } from 'src/users/users.repository';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/role.guard';
import { Role } from './decorators/role.enum';
import { Roles } from './decorators/roles.decorators';

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

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Request() req: { user: Partial<User> }): Partial<User> {
    if (!req.user) throw new NotFoundException('User not found');

    const profile: Partial<User> = {
      id: req.user.id,
      name: req.user.name,
      username: req.user.username,
      role: req.user.role,
    };

    return profile;
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile/:id')
  async profileById(@Param() params: { id: string }): Promise<Partial<User>> {
    const { id } = params;

    const userProfile = await this.userService.findById(+id);

    if (!userProfile) throw new NotFoundException(`User ${id} not found`);

    return userProfile;
  }
}
