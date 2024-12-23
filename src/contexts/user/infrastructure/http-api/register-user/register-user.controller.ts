import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUser } from '../../../application/register-user-use-case/register-user';
import { RegisterUserHttpDTO } from './register-user.http-dto';

@Controller('users')
export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  @Post()
  public async run(
    @Body() registerUserHttpDTO: RegisterUserHttpDTO,
  ): Promise<void> {
    await this.registerUser.execute({
      firstname: registerUserHttpDTO.firstname,
      lastname: registerUserHttpDTO.lastname,
      email: registerUserHttpDTO.email,
      password: registerUserHttpDTO.password,
      DNI: registerUserHttpDTO.DNI,
    });
  }
}
