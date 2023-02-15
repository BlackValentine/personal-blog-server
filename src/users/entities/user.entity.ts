import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/baseEntity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;
}
