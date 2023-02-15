import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
