import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserController } from './register-user.controller';
import { RegisterUser } from '../../../application/register-user-use-case/register-user';
import { RegisterUserHttpDTO } from './register-user.http-dto';

describe('RegisterUserController', () => {
  let registerUserController: RegisterUserController;
  let registerUserMock: Partial<RegisterUser>;

  beforeEach(async () => {
    // Creamos un mock de RegisterUser
    registerUserMock = {
      execute: jest.fn().mockResolvedValue(undefined), // Simulamos que el método execute siempre se resuelve correctamente
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RegisterUserController],
      providers: [
        {
          provide: RegisterUser,
          useValue: registerUserMock, // Usamos el mock en lugar de la implementación real
        },
      ],
    }).compile();

    registerUserController = moduleRef.get<RegisterUserController>(
      RegisterUserController,
    );
  });

  it('should be defined', () => {
    expect(registerUserController).toBeDefined();
  });

  describe('run', () => {
    it('should call RegisterUser.execute with the correct parameters', async () => {
      const dto: RegisterUserHttpDTO = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'securePassword',
        DNI: 12345678,
      };

      await registerUserController.run(dto);

      // Verificamos que el método execute fue llamado con los argumentos correctos
      expect(registerUserMock.execute).toHaveBeenCalledTimes(1);
      expect(registerUserMock.execute).toHaveBeenCalledWith({
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        password: dto.password,
        DNI: dto.DNI,
      });
    });

    it('should throw an error if RegisterUser.execute fails', async () => {
      const dto: RegisterUserHttpDTO = {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        password: 'anotherPassword',
        DNI: 87654321,
      };

      // Simulamos que el método execute lanza un error
      (registerUserMock.execute as jest.Mock).mockRejectedValue(
        new Error('Use case error'),
      );

      await expect(registerUserController.run(dto)).rejects.toThrow(
        'Use case error',
      );
    });
  });
});
