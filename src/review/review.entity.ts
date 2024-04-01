import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('REVIEW', { schema: 'REVIEW' })
export class MovieEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'review_id' })
  review_id: number;

  @Column({ type: 'varchar', name: 'title' })
  title: String;

  @Column({ type: 'varchar', name: 'content' })
  content: String;

  @Column({ type: 'boolean', name: 'like' })
  like: boolean;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  created_at: Date;

  @Column({ type: 'varchar', name: 'image_url' })
  image_url: boolean;

  @Column({ type: 'int', name: 'views' })
  views: number;
}
