import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNewBlogDto } from '../dtos/blog.dto';
import { Blog } from '../entities/blog.entity';
import { BlogService } from '../services/blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('all')
  getAllBlog() {
    return this.blogService.getAllBlog();
  }

  @Get(':id')
  getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @Post('create')
  createNewBlog(@Body() blog: CreateNewBlogDto) {
    return this.blogService.createNewBlog(blog);
  }

  @Put('edit')
  editBlog(@Body() blog: Blog) {
    return this.blogService.editBlog(blog);
  }

  @Delete('delete/:id')
  deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }
}
