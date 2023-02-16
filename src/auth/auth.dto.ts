import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
