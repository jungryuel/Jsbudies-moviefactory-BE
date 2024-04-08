import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { Review } from 'src/review/review.entity';
import { ReviewRepository } from 'src/review/review.repository';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Review, User])],
  controllers: [CommentController],
  providers: [CommentService, ReviewRepository, UserRepository],
})
export class CommentModule {}
