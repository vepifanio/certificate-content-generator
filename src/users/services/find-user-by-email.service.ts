import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/UsersRepository';

@Injectable()
export class FindUserByEmailService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(email: string) {
    return this.usersRepository.findByEmail(email);
  }
}
