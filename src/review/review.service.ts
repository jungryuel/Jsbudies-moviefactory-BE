import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { InsertReviewDto } from 'src/user/dto/InsertReviewDto';
import { Repository } from 'typeorm';
import { ReviewResponseDto } from './reviewResoponseDto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async createReview(reviewDto: InsertReviewDto): Promise<String> {
    const review = new InsertReviewDto().toEntity(reviewDto);
    await this.reviewRepository.save(review);
    return '리뷰생성 성공';
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

  // 조회수 업데이트하기
  async updateViews(review_id: number): Promise<void> {
    const getReviewById = await this.reviewRepository.findOne({
      where: { review_id: review_id },
    });
    getReviewById.views++;
    await this.reviewRepository.save(getReviewById);
  }

  // 리뷰 리스트 가져오기
  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findOne(review_id: number): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.findOne({
      where: { review_id },
      relations: ['user'],
    });

    return ReviewResponseDto.from(review);
  }
}

// async findAll(): Promise<ReviewListDto[]> {
//   const movie: movieTitleDTO[] = await this.movieRepository.find();
//   // Review 엔티티에서 모든 리뷰를 가져옵니다.
//   const reviews: ReviewDTO = movie.map((v) => {
//     return this.reviewRepository.find({
//       relations: {
//         movie: true,
//       },
//       where: {
//         title: v.title,
//       },
//     });
//   });
// }

//   // 가져온 리뷰들을 ReviewListDto 형식으로 변환합니다.
//   const reviewList: ReviewListDto[] = reviews.map((v) => {
//     return {
//       review_id: v.review_id,
//       title: v.title,
//     };
//     // ReviewListDto.from;
//   });

//   return reviewList;
// }
