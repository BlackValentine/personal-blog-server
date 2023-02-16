import { BaseEntity } from 'src/baseEntity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Blogs',
})
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
