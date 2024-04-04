import { IsNotEmpty } from 'class-validator';
import { Review } from './review.entity';

export class ReviewListDto {
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
  movie_id: number;
}
