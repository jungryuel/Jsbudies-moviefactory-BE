import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { MovieDto } from './dto/MovieDto';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: MovieRepository,
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
}
