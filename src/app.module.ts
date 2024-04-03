import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
import { ormConfig } from './orm.config';

@Module({
  imports: [
    MovieModule,
    UserModule,
    ReviewModule,
    CommentModule,
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
  ],
  controllers: [AppController, CommentController],
  providers: [AppService, CommentService],
})
export class AppModule {}
