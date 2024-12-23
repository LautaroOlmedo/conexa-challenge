import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUser } from './register-user';
import { UserRepository } from '../../domain/user.repository';
import { RegisterUserDTO } from './register-user.dto';
import { User } from '../../domain/user';

describe('RegisterUser', () => {
  let registerUser: RegisterUser;
  let userRepositoryMock: Partial<UserRepository>;

  beforeEach(async () => {
    // Mock de UserRepository con un método `register` que resuelve correctamente.
    userRepositoryMock = {
      register: jest.fn().mockResolvedValue(undefined), // Simula que `register` no lanza errores.
    };

    // Crea un módulo de prueba para RegisterUser con dependencias mockeadas.
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUser, // Proveedor principal (la clase que estamos testeando).
        {
          provide: UserRepository, // Sustituye UserRepository con nuestro mock.
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    // Obtiene la instancia de RegisterUser del módulo de prueba.
    registerUser = module.get<RegisterUser>(RegisterUser);
  });

  it('should be defined', () => {
    // Verifica que la instancia de RegisterUser haya sido creada correctamente.
    expect(registerUser).toBeDefined();
  });

  it('should call userRepository.register with a valid User instance', async () => {
    // Datos de prueba que simulan un DTO recibido.
    const dto: RegisterUserDTO = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'securePassword',
      DNI: 12345678,
    };

    // Ejecuta el caso de uso con los datos simulados.
    await registerUser.execute(dto);

    // Verifica que el método `register` de UserRepository fue llamado una vez.
    expect(userRepositoryMock.register).toHaveBeenCalledTimes(1);

    // Obtiene el argumento pasado al método `register` en la primera llamada.
    const userArgument = (userRepositoryMock.register as jest.Mock).mock
      .calls[0][0];

    // Verifica que el argumento pasado sea una instancia de la clase User.
    expect(userArgument).toBeInstanceOf(User);

    // Verifica que las propiedades del usuario coincidan con las del DTO.
    expect(userArgument.toValue()).toMatchObject({
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      password: dto.password,
      DNI: dto.DNI,
    });
  });

  it('should throw an error if userRepository.register fails', async () => {
    // Datos de prueba para simular un error en el repositorio.
    const dto: RegisterUserDTO = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'securePassword',
      DNI: 12345678,
    };

    // Simula que el método `register` lanza un error al ser llamado.
    (userRepositoryMock.register as jest.Mock).mockRejectedValue(
      new Error('service error: cannot register a user'),
    );

    // Verifica que el método `execute` lanza el mismo error cuando falla `register`.
    await expect(registerUser.execute(dto)).rejects.toThrow(
      'service error: cannot register a user',
    );
  });
});
