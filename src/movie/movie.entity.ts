import { Review } from 'src/review/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('MOVIE', { schema: 'MOVIE' })
@Entity({ name: 'MOVIE' })
export class Movie {
  @PrimaryGeneratedColumn({ type: 'int', name: 'movie_id' })
  movie_id: number;

  @Column({ type: 'varchar', name: 'title' })
  title: string;

  @Column({ type: 'varchar', name: 'summary', length:2000 })
  summary: string;

  @Column({ type: 'date', name: 'open_date' })
  open_date: Date;

  @Column({ type: 'date', name: 'close_date' })
  close_date: Date;

  @Column({ type: 'int', name: 'audi_acc' })
  audi_acc: number;

  @Column({ type: 'varchar', name: 'image_url' })
  image_url: string;

  @Column({ type: 'varchar', name: 'theme' })
  theme: string;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
