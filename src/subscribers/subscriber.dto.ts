import { IsNotEmpty } from 'class-validator';

export class SubscriberDto {
  @IsNotEmpty()
  email: string;
}
