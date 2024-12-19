import { Module } from '@nestjs/common';
import { RegisterUserController } from './http-api/register-user/register-user.controller';
import { RegisterUser } from '../application/register-user-use-case/register-user';
import { InMemoryUserRepository } from './repositories/in-memory.user-repository';
import { UserRepository } from '../domain/user.repository';

@Module({
  controllers: [RegisterUserController],
  providers: [
    RegisterUser,
    InMemoryUserRepository,
    {
      provide: UserRepository,
      useExisting: InMemoryUserRepository,
    },
  ],
  exports: [],
})
export class UserModule {}
