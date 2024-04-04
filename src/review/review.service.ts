import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';
import { ReviewDto } from 'src/user/dto/ReviewDto';
import { Movie } from 'src/movie/movie.entity';
import { InsertReviewDto } from 'src/user/dto/InsertReviewDto';
import { error } from 'console';
import { ReviewListDto } from './reviewListDto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: ReviewRepository,
  ) {}

  async createReview(reviewDto: InsertReviewDto): Promise<Review> {
    const review = new InsertReviewDto().toEntity(reviewDto);
    return await this.reviewRepository.save(review);
  }
  async deleteReview(review_id: number): Promise<void> {
    await this.reviewRepository.delete(review_id);
  }
  async updateReview(
    review_id: number,
    reviewTitle: string,
    reviewContent: string,
    user_id: number,
  ): Promise<void> {
    const reviewToUpdate = await this.reviewRepository.findOne({
      where: { review_id },
    });
    console.log(reviewToUpdate);
    if (!reviewToUpdate) throw new NotFoundException('리뷰 찾을 수 없습니다.');
    const user = await reviewToUpdate.user;
    console.log(user);
    if (user_id === user.user_id) {
      if (!reviewToUpdate) {
        throw new NotFoundException('리뷰 찾을 수 없습니다.');
      }
      reviewToUpdate.title = reviewTitle;
      reviewToUpdate.content = reviewContent;

      await this.reviewRepository.save(reviewToUpdate);
    } else {
      throw new BadRequestException('리뷰 찾을 수 없습니다.');
    }
  }
  async findAll(): Promise<ReviewListDto[]> {
    // Review 엔티티에서 모든 리뷰를 가져옵니다.
    const reviews: Review[] = await this.reviewRepository.find();

    // 가져온 리뷰들을 ReviewListDto 형식으로 변환합니다.
    const reviewList: ReviewListDto[] = await Promise.all(reviews.map(async review => {
      const reviewDto = new ReviewListDto();
      reviewDto.review_id = review.review_id;
      reviewDto.title = review.title;
      reviewDto.content = review.content;
      reviewDto.created_at = review.created_at;
      reviewDto.views = review.views;
      reviewDto.star = review.star;
      
      // 리뷰와 연결된 영화를 가져옵니다.
      const movie: Movie = await this.movieRepository.findOne(review.movie_id);
      // 가져온 영화의 ID를 reviewDto에 할당합니다.
      reviewDto.movie_id = movie.movie_id;

      return reviewDto;
    }));

    return reviewList;
  }
}
}
