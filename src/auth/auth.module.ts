import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './contants';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '1h'
      }
    }),
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
