import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewBlog } from '../dtos/blog.dto';
import { Blog } from '../entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
  ) {}

  async getAllBlog(): Promise<Blog[]> {
    return await this.blogRepository.find();
  }

  async getBlogById(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id: id } });
    if (!blog) {
      throw new HttpException('This blog is not exsit', HttpStatus.BAD_REQUEST);
    }
    return blog;
  }

  async createNewBlog(blog: CreateNewBlog): Promise<Blog> {
    return await this.blogRepository.save(blog);
  }

  async editBlog(blog: Blog): Promise<CreateNewBlog> {
    const blogEdited = await this.blogRepository.findOne({
      where: { id: blog.id },
    });

    if (!blogEdited) {
      throw new HttpException('Blog is not exist', HttpStatus.BAD_REQUEST);
    } else {
      blogEdited.title = blog.title;
      blogEdited.subTitle = blog.subTitle;
      blogEdited.image = blog.image;
      blogEdited.content = blog.content;
      blogEdited.rawContent = blog.rawContent;

      return this.blogRepository.save(blogEdited);
    }
  }

  async deleteBlog(id: string) {
    await this.blogRepository.delete(id);
    throw new HttpException('Delete blog successfully!!!', HttpStatus.ACCEPTED);
  }
}
