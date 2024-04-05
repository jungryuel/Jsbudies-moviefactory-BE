import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewDto } from 'src/user/dto/ReviewDto';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { InsertReviewDto } from 'src/user/dto/InsertReviewDto';
import { ReviewRepository } from './review.repository';
import { get } from 'http';
import { ReviewListDto } from './reviewListDto';
import { Movie } from 'src/movie/movie.entity';
import { ReviewResponseDto } from './reviewResoponseDto';
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //리뷰 추가
  @Post()
  async createReview(@Body() reviewDto: InsertReviewDto): Promise<String> {
    return this.reviewService.createReview(reviewDto);
  }
  //리뷰 삭제
  @Delete()
  async deleteReview(@Body() review_id: number): Promise<void> {
    await this.reviewService.deleteReview(review_id);
  }
  //리뷰 수정
  @Patch()
  async updateReview(
    @Body() { review_id, reviewTitle, reviewContent, user_id }: any,
    // @Body('review_id') review_id: number,
    // @Body('reviewTitle') reviewTitle: string,
    // @Body('reviewContent') reviewContent: string,
    // @Body('user_id') user_id: number,
  ): Promise<void> {
    // console.log({ review_id, reviewTitle, reviewContent, user_id });
    await this.reviewService.updateReview(
      review_id,
      reviewTitle,
      reviewContent,
      user_id,
    );
  }
  //getall/getone
  @Get()
  findAllReviews(): Promise<Review[]> {
    return this.reviewService.findAll();
  }
  @Get('/:review_id')
  async findReview(
    @Param('review_id') review_id: number,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.findOne(review_id);
  }

  //@Param('review_id') review_id: number
  //리뷰 read
  // @Get()
  //async findAllReviews(
  //  @Param('review_id') review_id: number,
  //): Promise<Comment[]>{
  //  return await this.reviewService.findAllReviews(review_id);
  // }
  //)

  // }
}
