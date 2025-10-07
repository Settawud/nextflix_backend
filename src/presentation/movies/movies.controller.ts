import { Controller, Get, Inject, Param, Query } from '@nestjs/common';

import { GetFeaturedMoviesService } from '../../application/use-cases/get-featured-movies.service';
<<<<<<< HEAD
=======
import { GetNowPlayingMoviesService } from '../../application/use-cases/get-now-playing-movies.service';
import { GetTopRatedMoviesService } from '../../application/use-cases/get-top-rated-movies.service';
import { GetTrendingMoviesService } from '../../application/use-cases/get-trending-movies.service';
>>>>>>> bd7b50f (feat(movies): expose featured, trending, top-rated, now-playing endpoints && chore(app): show online status page on root)
import { MOVIE_REPO } from '../../domain/repositories/movie.repository';
import type { MovieRepository } from '../../domain/repositories/movie.repository';

@Controller('api/movies')
export class MoviesController {
  constructor(
    private readonly featured: GetFeaturedMoviesService,
<<<<<<< HEAD
=======
    private readonly trendingService: GetTrendingMoviesService,
    private readonly topRatedService: GetTopRatedMoviesService,
    private readonly nowPlayingService: GetNowPlayingMoviesService,
>>>>>>> bd7b50f (feat(movies): expose featured, trending, top-rated, now-playing endpoints && chore(app): show online status page on root)
    @Inject(MOVIE_REPO) private readonly repo: MovieRepository,
  ) {}

  @Get('featured')
  featuredRails() {
    return this.featured.execute();
  }

<<<<<<< HEAD
=======
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

>>>>>>> bd7b50f (feat(movies): expose featured, trending, top-rated, now-playing endpoints && chore(app): show online status page on root)
  @Get('search')
  search(@Query('q') query: string, @Query('page') page = '1') {
    return this.repo.search(query, Number(page) || 1);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.repo.byId(Number(id));
  }
}
