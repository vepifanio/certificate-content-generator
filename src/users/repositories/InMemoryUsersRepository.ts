import { User } from '../entities/user.entity';
import { UsersRepository } from './UsersRepository';

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = [];

  async create(user: User): Promise<User> {
    const persistedUser = new User(
      user.getEmail(),
      user.getPassword(),
      this.items.length,
    );
    this.items.push(persistedUser);

    return persistedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((item) => item.getEmail() === email) || null;
  }
}
