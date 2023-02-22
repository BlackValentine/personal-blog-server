import { IsNotEmpty } from 'class-validator';

export class CreateNewBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  subTitle: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  rawContent: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  type: string;
}

export class PaginationBlogDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;
}
