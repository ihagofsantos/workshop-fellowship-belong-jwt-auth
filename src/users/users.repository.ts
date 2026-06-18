import { Inject, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/decorators/role.enum';
import { CryptoService } from 'src/crypto/crypto.service';

export type User = {
  id: number;
  name: string;
  username: string;
  password?: string;
  role: Role;
};

@Injectable()
export class UsersRepository {
  private readonly users: User[];

  constructor(@Inject() private readonly cryptoService: CryptoService) {
    this.users = [
      {
        id: 1,
        name: 'Ihago 1',
        username: 'ihago1',
        password: this.cryptoService.hash('1234'), // Ao salvar no banco, a senha deve ser sempre criptografada.
        role: Role.Admin,
      },
      {
        id: 2,
        name: 'Ihago 2',
        username: 'ihago2',
        password: this.cryptoService.hash('1234'), // Ao salvar no banco, a senha deve ser sempre criptografada.
        role: Role.User,
      },
    ];
  }

  async findById(id: number): Promise<User | undefined> {
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.id === id);
      resolve(user);
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.username === username);
      resolve(user);
    });
  }
}
