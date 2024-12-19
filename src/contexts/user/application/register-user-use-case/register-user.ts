import { log } from 'console';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';
import { RegisterUserDTO } from './register-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(dto: RegisterUserDTO): Promise<void> {
    const user: User = User.create(dto); // ---> instancia del nuevo user
    console.log('user: ', user);

    await this.userRepository.register(user);
  }
}