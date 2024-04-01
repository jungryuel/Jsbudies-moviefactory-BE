import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('MOVIE', { schema: 'MOVIE' })
export class MovieEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'comment_id' })
  comment_id: number;

  @Column({ type: 'varchar', name: 'content' })
  content: String;

  @Column({ type: 'boolean', name: 'like' })
  like: boolean;

  @Column({ type: 'date', name: 'created_at' })
  created_at: Date;
}
