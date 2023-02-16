import { BaseEntity } from 'src/baseEntity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Blogs',
})
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subTitle: string;

  @Column()
  image: string;

  @Column()
  content: string;

  @Column()
  rawContent: string;
}
