import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  getBlog(): string {
    return 'This is Black Valentine blog!';
  }
}
