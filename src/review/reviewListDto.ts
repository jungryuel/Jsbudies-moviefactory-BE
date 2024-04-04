import { IsNotEmpty } from 'class-validator';
import { Review } from './review.entity';

export class movieTitleDTO {
  title: string;
}

export class ReviewDTO {
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
}

export class ReviewListDto {
  @IsNotEmpty()
  movie: movieTitleDTO;
  @IsNotEmpty()
  review: ReviewDTO[];

  // static async from(review: Review) {
  //   const reviewDto = new ReviewListDto();
  //   reviewDto.review_id = review.review_id;
  //   reviewDto.title = review.title;
  //   reviewDto.content = review.content;
  //   reviewDto.created_at = review.created_at;
  //   reviewDto.views = review.views;
  //   reviewDto.star = review.star;
  //   const movie = await review.movie;
  //   // 리뷰와 연결된 영화를 가져옵니다.
  //   reviewDto.movie_id = (await movie) ? movie.movie_id : null;
  //   return reviewDto;
  // }
}
