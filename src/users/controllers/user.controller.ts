import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('profile')
  @UseGuards(AuthGuard())
  async getProfile(@Req() req: any) {
    return req.user;
  }

  @Post()
  createNewUser(@Body() user: CreateUserDto) {
    return this.userService.createNewUser(user);
  }

  @Post('login')
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login({ email, password });
  }
}
