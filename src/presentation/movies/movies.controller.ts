import { Controller, Get, Inject, Param, Query } from '@nestjs/common';

import { GetFeaturedMoviesService } from '../../application/use-cases/get-featured-movies.service';
import { GetMovieAssetsService } from '../../application/use-cases/get-movie-assets.service';
import { GetNowPlayingMoviesService } from '../../application/use-cases/get-now-playing-movies.service';
import { GetTopRatedMoviesService } from '../../application/use-cases/get-top-rated-movies.service';
import { GetTrendingMoviesService } from '../../application/use-cases/get-trending-movies.service';
import { MOVIE_REPO } from '../../domain/repositories/movie.repository';
import type { MovieRepository } from '../../domain/repositories/movie.repository';

@Controller('api/movies')
export class MoviesController {
  constructor(
    private readonly featured: GetFeaturedMoviesService,
    private readonly trendingService: GetTrendingMoviesService,
    private readonly topRatedService: GetTopRatedMoviesService,
    private readonly nowPlayingService: GetNowPlayingMoviesService,
    private readonly movieAssetsService: GetMovieAssetsService,
    @Inject(MOVIE_REPO) private readonly repo: MovieRepository,
  ) {}

  @Get('featured')
  featuredRails() {
    return this.featured.execute();
  }

  @Get('trending')
  trending() {
    return this.trendingService.execute();
  }

  @Get('top-rated')
  topRated() {
    return this.topRatedService.execute();
  }

  @Get('now-playing')
  nowPlaying() {
    return this.nowPlayingService.execute();
  }

  @Get('search')
  search(@Query('q') query: string, @Query('page') page = '1') {
    return this.repo.search(query, Number(page) || 1);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.repo.byId(Number(id));
  }

  @Get(':id/assets')
  assets(@Param('id') id: string) {
    return this.movieAssetsService.execute(Number(id));
  }
}
