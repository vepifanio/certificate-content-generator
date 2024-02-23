import { User } from '../entities/user.entity';
import { UsersRepository } from './UsersRepository';

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((item) => item.getEmail() === email) || null;
  }
}
