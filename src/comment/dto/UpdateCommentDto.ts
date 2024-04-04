import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Comment } from '../comment.entity';

export class UpdateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  user_id: number;

  static toEntity(dto: UpdateCommentDto) {
    const comment = new Comment();
    comment.content = dto.content;

    const user = new User();
    user.user_id = dto.user_id;

    comment.user = user;
    return comment;
  }
}
