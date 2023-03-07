import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.createNewUser(userDto);
    const token = await this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByLogin(loginUserDto);
    const token = await this._createToken(user);
    return {
      userName: user.userName,
      email: user.email,
      ...token,
    };
  }

  async validateUser(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private async _createToken({ email }, refresh = false): Promise<any> {
    const accessToken = this.jwtService.sign({ email });
    if (!refresh) {
      const refreshToken = this.jwtService.sign(
        { email },
        {
          secret: process.env.SECRET_KEY_REFRESH,
          expiresIn: process.env.EXPIRESIN_REFRESH,
        },
      );
      await this.userService.update(
        { emai: email },
        { refreshToken: refreshToken },
      );
      return {
        expiresInRefresh: process.env.EXPIRESIN_REFRESH,
        expiresInAccess: process.env.EXPIRESIN,
        accessToken,
        refreshToken,
      };
    }
    return {
      expiresInAccess: process.env.EXPIRESIN,
      accessToken,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.SECRET_KEY_REFRESH,
      });
      const user = await this.userService.getUserByRefreshToken(
        refreshToken,
        payload.email,
      );
      const token = await this._createToken(user, true);
      return {
        email: user.email,
        accessToken: token.accessToken,
      };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
