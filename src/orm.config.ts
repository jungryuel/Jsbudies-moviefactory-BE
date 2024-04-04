import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Comment } from './comment/comment.entity';
import { Movie } from './movie/movie.entity';
import { Review } from './review/review.entity';
import { User } from './user/user.entity';

export function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCHRONIZE: false,
    // ENTITIES: [__dirname + './**/*.entity.{ts, js}'],
    ENTITIES: [Comment, Movie, Review, User],
    // MIGRATIONS: [__dirname + '/migrations/**/*{ts,.js}'],
    // MIGRATIONS_RUN: false,
  };

  return {
    // name: 'movie',
    type: 'oracle',
    database: 'movie',
    host: ' 192.168.80.14',
    port: Number(process.env.DB_PORT),
    username: 'system',
    password: '1234',
    logging: true,
    connectString: 'localhost:1522/orcl',
    synchronize: commonConf.SYNCHRONIZE,
    entities: commonConf.ENTITIES,
    // migrations: commonConf.MIGRATIONS,
    // migrationsRun: commonConf.MIGRATIONS_RUN,
  };
}
