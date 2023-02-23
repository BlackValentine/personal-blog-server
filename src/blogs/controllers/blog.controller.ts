import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateNewBlogDto, PaginationBlogDto } from '../dtos/blog.dto';
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
  @UseGuards(AuthGuard())
  getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @Get()
  getAllBlogPagination(@Query() { page, limit }: PaginationBlogDto) {
    return this.blogService.getAllBlogPagination(page, limit);
  }

  @Post('create')
  @UseGuards(AuthGuard())
  createNewBlog(@Body() blog: CreateNewBlogDto) {
    return this.blogService.createNewBlog(blog);
  }

  @Put('edit')
  @UseGuards(AuthGuard())
  editBlog(@Body() blog: Blog) {
    return this.blogService.editBlog(blog);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard())
  deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }
}
