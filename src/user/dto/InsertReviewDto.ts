import { IsNotEmpty } from 'class-validator';
import { Movie } from 'src/movie/movie.entity';
import { Review } from 'src/review/review.entity';
import { User } from '../user.entity';

export class InsertReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  star: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  movie_id: number;

  toEntity(dto: InsertReviewDto) {
    const review = new Review();
    review.content = dto.content;
    review.title = dto.title;
    review.star = dto.star;
    review.views = 0;
    const movie = new Movie();
    movie.movie_id = dto.movie_id;
    const user = new User();
    user.user_id = dto.user_id;
    return review;
  }
}
