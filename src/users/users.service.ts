import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User, UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject()
    private readonly userRepository: UsersRepository,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findByUsername(username);
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return {
      ...user,
      password: undefined,
    };
  }
}
