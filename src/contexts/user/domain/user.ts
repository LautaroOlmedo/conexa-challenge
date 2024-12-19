import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  DNI: number;
}

export class User {
  constructor(private attributes: PrimitiveUser) {}

  static create(createUser: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    DNI: number;
  }): User {
    return new User({
      id: uuidv4(),
      firstname: createUser.firstname,
      lastname: createUser.lastname,
      email: createUser.email,
      password: createUser.password,
      DNI: createUser.DNI,
    });
  }

  toValue(): PrimitiveUser {
    return {
      id: this.attributes.id,
      firstname: this.attributes.firstname,
      lastname: this.attributes.lastname,
      email: this.attributes.email,
      password: this.attributes.password,
      DNI: this.attributes.DNI,
    };
  }
}
