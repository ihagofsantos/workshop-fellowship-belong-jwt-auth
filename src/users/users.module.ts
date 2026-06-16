import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { UsersRepository } from './users.repository';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [CryptoModule],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
