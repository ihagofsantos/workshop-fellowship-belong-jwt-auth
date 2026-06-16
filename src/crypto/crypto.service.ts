import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { SALT } from 'src/auth/contants';

@Injectable()
export class CryptoService {
  hash(text: string): string {
    return createHash('sha-256')
      .update(SALT + text)
      .digest('hex');
  }

  compare(text: string, hash: string): boolean {
    return this.hash(text) === hash;
  }
}
