import { CoreEntity } from '../../common/entities/core.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;
}
