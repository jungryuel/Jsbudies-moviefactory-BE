import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('USER', { schema: 'USER' })
export class MovieEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  user_id: number;

  @Column({ type: 'varchar', name: 'id' })
  id: String;

  @Column({ type: 'varchar', name: 'nick_name' })
  nick_name: String;

  @Column({ type: 'varchar', name: 'password' })
  password: String;
}
