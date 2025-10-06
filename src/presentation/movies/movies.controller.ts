import { Controller, Get, Param, Query, Inject } from '@nestjs/common';
import { GetFeaturedMoviesService } from '../../application/use-cases/get-featured-movies.service';
import { MOVIE_REPO } from "../../domain/repositories/movie.repository"; // MOVIE_REPO เป็น value (symbol)
import type { MovieRepository } from "../../domain/repositories/movie.repository"; // MovieRepository เป็น type

@Controller('api/movies')
export class MoviesController {
    constructor(
        private featured: GetFeaturedMoviesService,
        @Inject(MOVIE_REPO) private repo: MovieRepository,
    ) {}
    @Get('featured') featuredRails() { return this.featured.execute(); }
    @Get('search') search(@Query('q') q:string, @Query('page') page = '1') { return this.repo.search(q, Number(page)||1); }
    @Get(':id') byId(@Param('id') id:string) { return this.repo.byId(Number(id)); }
}