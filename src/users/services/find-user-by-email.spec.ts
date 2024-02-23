import { Test } from '@nestjs/testing';
import { InMemoryUsersRepository } from '../repositories/InMemoryUsersRepository';
import { FindUserByEmailService } from './find-user-by-email.service';
import { UsersRepository } from '../repositories/UsersRepository';
import { User } from '../entities/user.entity';

describe('Find user by email', () => {
  let sut: FindUserByEmailService;
  let usersRepository: InMemoryUsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        {
          module: class FakeClass {},
          providers: [
            {
              provide: UsersRepository,
              useClass: InMemoryUsersRepository,
            },
          ],
          exports: [UsersRepository],
        },
      ],
      providers: [FindUserByEmailService],
    }).compile();

    sut = moduleRef.get<FindUserByEmailService>(FindUserByEmailService);
    usersRepository = moduleRef.get<InMemoryUsersRepository>(UsersRepository);
  });

  it('shoud be able to find a user by their email', async () => {
    const user = new User('teste@teste.com', '12345', 1);
    usersRepository.items.push(user);

    const result = await sut.execute(user.getEmail());
    expect(result).toEqual(user);
  });

  it('should return null when no user is founded by the given id', async () => {
    const result = await sut.execute('non-existent@mail.com');
    expect(result).toBeNull();
  });
});
