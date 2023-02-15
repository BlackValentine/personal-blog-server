import { Controller, Get } from '@nestjs/common';
import { BlogService } from '../services/blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getBlog(): string {
    return this.blogService.getBlog();
  }
}
