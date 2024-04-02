import { Review } from 'src/review/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('MOVIE', { schema: 'MOVIE' })
export class Movie {
  @PrimaryGeneratedColumn({ type: 'int', name: 'movie_id' })
  movie_id: number;

  @Column({ type: 'varchar', name: 'title' })
  title: String;

  @Column({ type: 'varchar', name: 'summary' })
  summary: String;

  @Column({ type: 'date', name: 'open_date' })
  open_date: Date;

  @Column({ type: 'date', name: 'close_date' })
  close_date: Date;

  @Column({ type: 'int', name: 'audi_acc' })
  audi_acc: number;

  @Column({ type: 'varchar', name: 'image_url' })
  image_url: String;

  @Column({ type: 'varchar', name: 'theme' })
  theme: String;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
