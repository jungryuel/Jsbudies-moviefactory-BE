import { Review } from 'src/review/review.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
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

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  created_at: Date;

  @ManyToOne(() => Review, (review) => review.comments, { eager: true })
  @JoinColumn({ name: 'review_id' })
  review: Review;

  // 글쓴이의 nick_name을 보여주어야 한다.
  @ManyToOne(() => User, (user) => user.user_id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
