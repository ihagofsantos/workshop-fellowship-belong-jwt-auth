import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [AuthModule, UsersModule, CryptoModule],
})
export class AppModule {}
