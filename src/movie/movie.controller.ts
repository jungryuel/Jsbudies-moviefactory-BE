import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/MovieDto';
import { Movie } from './movie.entity';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<MovieDto[]> {
    return await this.movieService.findAll();
  }

  @Get('/:movie_id')
  async findReview(@Param('movie_id') movie_id: number): Promise<Movie> {
    return await this.movieService.findOne(movie_id);
  }
}
