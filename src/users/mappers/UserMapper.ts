import { User as PrismaUser } from '@prisma/client';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    const { id, email, password } = prismaUser;

    return new User(email, password, id);
  }
}
