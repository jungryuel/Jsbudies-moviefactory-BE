import { Review } from 'src/review/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('USER', { schema: 'MOVIE' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  user_id: number;

  @Column({ type: 'varchar', name: 'id' })
  id: String;

  @Column({ type: 'varchar', name: 'nick_name' })
  nick_name: String;

  @Column({ type: 'varchar', name: 'password' })
  password: String;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
