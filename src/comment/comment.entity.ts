import { Review } from 'src/review/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Comment', { schema: 'MOVIE' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'comment_id' })
  comment_id: number;

  @Column({ type: 'varchar', name: 'content' })
  content: String;

  @Column({ type: 'boolean', name: 'like' })
  like: boolean;

  @Column({ type: 'date', name: 'created_at' })
  created_at: Date;

  @ManyToOne(() => Review, (review) => review.comments)
  @JoinColumn({ name: 'review_id' })
  review: Review;
}
