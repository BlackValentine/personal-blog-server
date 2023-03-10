import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './controllers/blog.controller';
import { Blog } from './entities/blog.entity';
import { BlogService } from './services/blog.service';
import { S3Service } from './services/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BlogController],
  providers: [BlogService, S3Service],
  exports: [TypeOrmModule],
})
export class BlogModule {}
