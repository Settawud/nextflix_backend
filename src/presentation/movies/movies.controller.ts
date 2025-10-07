import { Controller, Get, Inject, Param, Query } from '@nestjs/common';

import { GetFeaturedMoviesService } from '../../application/use-cases/get-featured-movies.service';
import { MOVIE_REPO } from '../../domain/repositories/movie.repository';
import type { MovieRepository } from '../../domain/repositories/movie.repository';

@Controller('api/movies')
export class MoviesController {
  constructor(
    private readonly featured: GetFeaturedMoviesService,
    @Inject(MOVIE_REPO) private readonly repo: MovieRepository,
  ) {}

  @Get('featured')
  featuredRails() {
    return this.featured.execute();
  }

  @Get('search')
  search(@Query('q') query: string, @Query('page') page = '1') {
    return this.repo.search(query, Number(page) || 1);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.repo.byId(Number(id));
  }
}
