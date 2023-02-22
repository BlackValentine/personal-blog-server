import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  userName: string;

  @Expose()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
