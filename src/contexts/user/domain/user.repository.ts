import { User } from './user';

export abstract class UserRepository {
  // Puerto dentro de Hex Arch. Tendremos distintos adapters para este puerto en la capa de infra. Ejemplo: Para SQL y NoSQL
  abstract register(user: User): Promise<void>;
}
