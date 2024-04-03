import { Review } from 'src/review/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USER' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  user_id: number;

  @Column({ type: 'varchar', name: 'id' })
  id: string;

  @Column({ type: 'varchar', name: 'nick_name' })
  nick_name: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
