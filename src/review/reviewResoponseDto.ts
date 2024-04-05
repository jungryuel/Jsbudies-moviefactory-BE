import { IsNotEmpty } from 'class-validator';
import { Review } from './review.entity';
import { User } from 'src/user/user.entity';

export class ReviewResponseDto {
  @IsNotEmpty()
  review_id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  created_at: Date;

  @IsNotEmpty()
  views: number;

  @IsNotEmpty()
  star: number;

  @IsNotEmpty()
  user_id: number;

  static async from(review: Review): Promise<ReviewResponseDto> {
    const reviewDto = new ReviewResponseDto();
    reviewDto.review_id = review.review_id;
    reviewDto.title = review.title;
    reviewDto.content = review.content;
    reviewDto.created_at = review.created_at;
    reviewDto.views = review.views;
    reviewDto.star = review.star;
    reviewDto.user_id = review.user ? review.user.user_id : null; // 사용자 객체가 존재하면 user_id를 할당

    return reviewDto;
  }
}