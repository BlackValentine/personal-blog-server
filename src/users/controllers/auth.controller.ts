import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/users/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  async refresh(@Body() body) {
    return await this.authService.refresh(body.refreshToken);
  }
}
