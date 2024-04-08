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

  @Column({ type: 'varchar', name: 'content', length: 2000 })
  content: string;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  created_at: Date;

  @Column({ type: 'int', name: 'views' })
  views: number;

  @Column({ type: 'int', name: 'star' })
  star: number;

  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.review)
  comments: Comment[];

  @ManyToOne(() => Movie, (movie) => movie.reviews, { eager: true })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
