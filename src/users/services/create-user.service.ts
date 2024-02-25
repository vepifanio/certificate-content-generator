import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/UsersRepository';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const emailIsUsed = await this.usersRepository.findByEmail(email);
    if (emailIsUsed) {
      throw new BadRequestException('Email is already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User(email, hashedPassword);
    const createdUser = await this.usersRepository.create(user);

    return {
      user: createdUser,
    };
  }
}
