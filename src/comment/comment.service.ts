import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { UpdateCommentDto } from './dto/UpdateCommentDto';
import { ReviewRepository } from 'src/review/review.repository';
import { UserRepository } from 'src/user/user.repository';
import { Review } from 'src/review/review.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: CommentRepository,
    @InjectRepository(Review)
    private reviewRepository: ReviewRepository,
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  // return 값의 type이 CreateCommentDto이지 않을까? (Comment가 아니라)
  async createComment(review_id: number, dto: CreateCommentDto): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { review_id: review_id },
    });
    if (!review) {
      throw new NotFoundException(`해당 리뷰를 찾을 수 없습니다`);
    }
    const user = await this.userRepository.findOne({
      where: { user_id: dto.user_id },
    });
    if (!user) {
      throw new NotFoundException(`잘못된 접근입니다 회원가입을 해주세요`);
    }
    await this.commentRepository.save(CreateCommentDto.toEntity(dto));
  }

  // 이렇게 하면 ReadCommentDto 에 해당하는 항목만 가져올 수 있나?
  async findAllComments(review_id: number): Promise<Comment[]> {
    const review = this.reviewRepository.findOne({
      where: { review_id: review_id },
    });
    if (!review) {
      throw new NotFoundException(`해당 리뷰를 찾을 수 없습니다`);
    }
    const allComment = await this.commentRepository.find();
    return allComment;
  }

  async updateComment(
    review_id: number,
    comment_id: number,
    dto: UpdateCommentDto,
  ): Promise<void> {
    const newComment = await this.commentRepository.findOneBy({ comment_id });

    const review = await this.reviewRepository.findOne({
      where: { review_id: review_id },
    });
    console.log(newComment.review.review_id);
    console.log(review);

    if (!review) {
      throw new NotFoundException('해당 리뷰를 찾을 수 없습니다.');
    }
    // if (newComment.review.review_id !== review_id) {
    //   throw new NotFoundException('해당 리뷰에 속한 댓글이 아닙니다.');
    // }
    if (newComment.user.user_id !== dto.user_id) {
      throw new NotFoundException('댓글을 수정할 권한이 없습니다.');
    }
    newComment.content = dto.content;
    console.log(newComment);
    await this.commentRepository.save(newComment);
  }

  async deleteComment(
    review_id: number,
    comment_id: number,
    user_id: number,
  ): Promise<void> {
    const getComment = await this.commentRepository.findOneBy({ comment_id });

    if (!getComment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }
    // if (getComment.review.review_id !== review_id) {
    //   throw new NotFoundException('해당 리뷰에 속한 댓글이 아닙니다.');
    // }
    if (getComment.user.user_id !== user_id) {
      throw new NotFoundException('댓글을 삭제할 권한이 없습니다.');
    }

    await this.commentRepository.delete({ comment_id });
  }
}
