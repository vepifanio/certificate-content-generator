import { Injectable } from '@nestjs/common';
import { UsersRepository } from './UsersRepository';
import { PrismaService } from 'src/prisma.service';
import { UserMapper } from '../mappers/UserMapper';
import { User } from '../entities/user.entity';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    const prismaUser = await this.prismaService.user.create({
      data: {
        email: user.getEmail(),
        password: user.getPassword(),
      },
    });

    return UserMapper.toDomain(prismaUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!prismaUser) {
      return null;
    }

    const user = UserMapper.toDomain(prismaUser);
    return user;
  }
}
