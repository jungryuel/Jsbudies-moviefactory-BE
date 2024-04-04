import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { UpdateCommentDto } from './dto/UpdateCommentDto';
import { NotFoundError } from 'rxjs';
import { Review } from 'src/review/review.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: CommentRepository,
  ) {}

  // return 값의 type이 CreateCommentDto이지 않을까? (Comment가 아니라)
  async createComment(dto: CreateCommentDto): Promise<void> {
    await this.commentRepository.save(CreateCommentDto.toEntity(dto));
  }
  // 이렇게 하면 ReadCommentDto 에 해당하는 항목만 가져올 수 있나?
  async findAllComments(review_id: number): Promise<Comment[]> {
    const allComment = this.commentRepository.find();
    return allComment;
  }

  async updateComment(
    comment_id: number,
    dto: UpdateCommentDto,
  ): Promise<void> {
    const newComment = await this.commentRepository.findOneBy({ comment_id });
    console.log(newComment);
    if (newComment.user.user_id === dto.user_id) {
      newComment.content = dto.content;
      console.log(newComment);
      await this.commentRepository.save(newComment);
    } else throw new NotFoundException('댓글을 수정할 권한이 없습니다.');
  }

  async deleteComment(comment_id: number, user_id: number): Promise<void> {
    const getComment = await this.commentRepository.findOneBy({
      comment_id,
    });
    console.log(getComment);
    if (getComment.user.user_id === user_id)
      await this.commentRepository.delete(comment_id);
    else throw new NotFoundException('댓글을 삭제할 권한이 없습니다.');
  }
}
