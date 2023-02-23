import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createNewUser(user: CreateUserDto): Promise<CreateUserDto> {
    user.password = await bcrypt.hash(user.password, 10);

    const userInDb = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.usersRepository.save(user);
    return plainToInstance(CreateUserDto, newUser);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const isEqual = bcrypt.compareSync(password, user.password);
    if (!isEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async update(filter, update) {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(
        this.reverse(update.refreshToken),
        10,
      );
    }
    const user = await this.usersRepository.findOne({
      where: {
        email: filter.email,
      },
    });
    const mergeUser = this.usersRepository.merge(user, update);
    return this.usersRepository.save(mergeUser);
  }

  async getUserByRefreshToken(refreshToken, email) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const isEqual = await bcrypt.compare(
      this.reverse(refreshToken),
      user.refreshToken,
    );
    if (!isEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private reverse(s) {
    return s.split('').reverse().join('');
  }
}
