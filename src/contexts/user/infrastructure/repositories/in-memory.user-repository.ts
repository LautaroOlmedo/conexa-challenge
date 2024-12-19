import { PrimitiveUser, User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';

export class InMemoryUserRepository extends UserRepository {
  private users: PrimitiveUser[] = [];
  public async register(user: User): Promise<void> {
    this.users.push(user.toValue());
  }
}
