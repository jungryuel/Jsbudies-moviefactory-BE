import { IsNotEmpty } from 'class-validator';
import { Review } from 'src/review/review.entity';
import { User } from 'src/user/user.entity';
import { Comment } from '../comment.entity';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  review_id: number;

  static toEntity(dto: CreateCommentDto) {
    const comment = new Comment();
    comment.content = dto.content;

    const user = new User();
    user.user_id = dto.user_id;

    const review = new Review();
    review.review_id = dto.review_id;

    comment.review = review;
    comment.user = user;
    return comment;
  }
}
