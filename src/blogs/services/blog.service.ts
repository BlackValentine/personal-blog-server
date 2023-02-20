import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewBlogDto } from '../dtos/blog.dto';
import { Blog } from '../entities/blog.entity';
import { S3Service } from './s3.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    private readonly s3Service: S3Service,
  ) {}

  async getAllBlog(): Promise<Blog[]> {
    const allBlogs = await this.blogRepository.find();
    for (const blog of allBlogs) {
      blog.image = await this.s3Service.getLinkMediaKey(blog.image);
    }
    return allBlogs;
  }

  async getBlogById(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id: id } });
    if (!blog) {
      throw new HttpException('This blog is not exsit', HttpStatus.BAD_REQUEST);
    } else {
      blog.image = await this.s3Service.getLinkMediaKey(blog.image);
      return blog;
    }
  }

  async getAllBlogPagination(page: number, limit: number) {
    const allBlogs = await this.blogRepository.count();
    const count = (allBlogs / limit).toFixed();
    const blogs = await this.blogRepository.find({
      order: { created_at: 'DESC' },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });
    return {
      blogs,
      count,
    };
  }

  async createNewBlog(blog: CreateNewBlogDto): Promise<Blog> {
    const imageName = await this.s3Service.upload(blog.image);
    return await this.blogRepository.save({
      ...blog,
      image: imageName,
    });
  }

  async editBlog(blog: Blog): Promise<CreateNewBlogDto> {
    const blogEdited = await this.blogRepository.findOne({
      where: { id: blog.id },
    });

    if (!blogEdited) {
      throw new HttpException('Blog is not exist', HttpStatus.BAD_REQUEST);
    } else {
      const mergeBlog = this.blogRepository.merge(blogEdited, blog);
      return this.blogRepository.save(mergeBlog);
    }
  }

  async deleteBlog(id: string) {
    const blogDelete = await this.blogRepository.findOne({
      where: { id: id },
    });
    if (!blogDelete) {
      throw new HttpException('Blog not found', HttpStatus.BAD_REQUEST);
    } else {
      await this.s3Service.deleteFileS3(blogDelete.image);
      await this.blogRepository.delete(id);
      throw new HttpException(
        'Delete blog successfully!!!',
        HttpStatus.ACCEPTED,
      );
    }
  }
}
