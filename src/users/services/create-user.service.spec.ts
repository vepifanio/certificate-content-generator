import { Test } from '@nestjs/testing';
import { InMemoryUsersRepository } from '../repositories/InMemoryUsersRepository';
import { CreateUserService } from './create-user.service';
import { UsersRepository } from '../repositories/UsersRepository';
import { User } from '../entities/user.entity';
import { BadRequestException } from '@nestjs/common';

describe('Create user', () => {
  let sut: CreateUserService;
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
      providers: [CreateUserService],
    }).compile();

    sut = moduleRef.get<CreateUserService>(CreateUserService);
    usersRepository = moduleRef.get<InMemoryUsersRepository>(UsersRepository);
  });

  it('should be able to create a user', async () => {
    const result = await sut.execute({
      email: 'test@test.com',
      password: '123456',
    });

    expect(result.user).toBeDefined();
    expect(result.user).toHaveProperty('id');
  });

  it('should not be able to create a user if the email is already taken', async () => {
    await usersRepository.create(new User('test@test.com', '123456'));
    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toThrow(new BadRequestException('Email is already in use.'));
  });
});
