import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterUserHttpDTO {
  @IsNotEmpty()
  @IsString()
  firstname!: string;

  @IsNotEmpty()
  @IsString()
  lastname!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsNumber()
  DNI!: number;
}
