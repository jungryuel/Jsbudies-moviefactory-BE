import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { MovieDto } from './dto/MovieDto';
import { Review } from 'src/review/review.entity';
import { ReviewRepository } from 'src/review/review.repository';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: MovieRepository,
        @InjectRepository(Review)
        private reviewRepository: ReviewRepository,
    ) {}

    async findAll(): Promise<MovieDto[]>{
        const movieList = await this.movieRepository.find();
        return movieList.map(movie => ({
            movie_id : movie.movie_id,
            title : movie.title,
            open_date : movie.open_date,
            close_date : movie.close_date,
            audi_acc : movie.audi_acc,
            image_url : movie.image_url,
            theme : movie.theme,
        }));
    }

    async getMovieDetails(movie_id: number): Promise<{ movie: Movie; reviews: Review[] }> {
        const movie = await this.movieRepository.findOne({ where: {movie_id : movie_id}});
        const reviews = await this.reviewRepository.find({ where: { movie: { movie_id } } });
        return { movie, reviews };
    }
}
