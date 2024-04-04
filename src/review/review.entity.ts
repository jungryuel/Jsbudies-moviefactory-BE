import { Comment } from 'src/comment/comment.entity';
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'REVIEW' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', name: 'review_id' })
  review_id: number;

  @Column({ type: 'varchar', name: 'title' })
  title: string;

  @Column({ type: 'varchar', name: 'content' })
  content: string;

  // @Column({ type: 'boolean', name: 'like' })
  // like: boolean;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  created_at: Date;

  // @Column({ type: 'varchar', name: 'image_url' })
  // image_url: boolean;

  @Column({ type: 'int', name: 'views' })
  views: number;

  @Column({ type: 'int', name: 'star' })
  star: number;

  @ManyToOne(() => User, (user) => user.reviews, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.review)
  comments: Comment[];

  @ManyToOne(() => Movie, (movie) => movie.reviews, { lazy: true })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
