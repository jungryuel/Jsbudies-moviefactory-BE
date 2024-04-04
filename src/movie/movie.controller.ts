import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/MovieDto';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    async findAll(): Promise<MovieDto[]> {
        return await this.movieService.findAll();
    }
}
