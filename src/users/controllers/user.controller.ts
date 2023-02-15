import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  createNewUser(@Body() user: CreateUserDto) {
    return this.userService.createNewUser(user);
  }
}
