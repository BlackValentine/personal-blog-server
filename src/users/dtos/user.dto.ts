import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  userName: string;

  @Expose()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Exclude()
  password: string;
}
