import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUser } from './register-user';
import { UserRepository } from '../../domain/user.repository';
import { RegisterUserDTO } from './register-user.dto';
import { User } from '../../domain/user';

describe('RegisterUser', () => {
  let registerUser: RegisterUser;
  let userRepositoryMock: Partial<UserRepository>;

  beforeEach(async () => {
    userRepositoryMock = {
      register: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUser,
        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    registerUser = module.get<RegisterUser>(RegisterUser);
  });

  it('should be defined', () => {
    expect(registerUser).toBeDefined();
  });

  it('should call userRepository.register with a valid User instance', async () => {
    const dto: RegisterUserDTO = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'securePassword',
      DNI: 12345678,
    };

    await registerUser.execute(dto);

    expect(userRepositoryMock.register).toHaveBeenCalledTimes(1);
    const userArgument = (userRepositoryMock.register as jest.Mock).mock
      .calls[0][0];
    expect(userArgument).toBeInstanceOf(User);
    expect(userArgument.toValue()).toMatchObject({
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      password: dto.password,
      DNI: dto.DNI,
    });
  });

  it('should throw an error if userRepository.register fails', async () => {
    const dto: RegisterUserDTO = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'securePassword',
      DNI: 12345678,
    };

    (userRepositoryMock.register as jest.Mock).mockRejectedValue(
      new Error('Database error'),
    );

    await expect(registerUser.execute(dto)).rejects.toThrow('Database error');
  });
});
