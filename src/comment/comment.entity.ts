import { Review } from 'src/review/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Comment' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'comment_id' })
  comment_id: number;

  @Column({ type: 'varchar', name: 'content' })
  content: string;

  // @Column({ type: 'boolean', name: 'like' })
  // like: boolean;

  @Column({ type: 'date', name: 'created_at' })
  created_at: Date;

  @ManyToOne(() => Review, (review) => review.comments)
  @JoinColumn({ name: 'review_id' })
  review: Review;
}
