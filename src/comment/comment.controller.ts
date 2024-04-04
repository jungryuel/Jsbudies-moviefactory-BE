import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { UpdateCommentDto } from './dto/UpdateCommentDto';
import { Review } from 'src/review/review.entity';

@Controller('review/comment') // /review (review page에 있기 때문에, 근데 review page가 1개가 아니기 때문에 :id 붙여야 하지 않을까?)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 새로운 댓글 작성 @새로운 페이지
  @Post('/create')
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    await this.commentService.createComment(createCommentDto);
  }

  // 사용자들이 작성한 모든 댓글 보기 @현재 페이지
  @Get('/:review_id')
  async findAllComments(
    @Param('review_id') review_id: number,
  ): Promise<Comment[]> {
    return await this.commentService.findAllComments(review_id);
  }

  // 내가 쓴 댓글 수정하고 바뀐 전체 목록 return @현재 페이지
  @Patch('/:comment_id')
  async updateComment(
    @Param('comment_id') comment_id: number,
    @Body() dto: UpdateCommentDto,
  ): Promise<void> {
    await this.commentService.updateComment(comment_id, dto);
  }

  // 내가 쓴 댓글 삭제 @현재 페이지
  @Delete('/:comment_id')
  async deleteComment(
    @Param('comment_id') comment_id: number,
    @Body('user_id') user_id: number, // 삭제 누르고 모달창에서 삭제하시겠습니까? (모달창의 id)
  ): Promise<void> {
    await this.commentService.deleteComment(comment_id, user_id);
  }
}
