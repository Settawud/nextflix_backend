import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GetFeaturedMoviesService } from 'src/application/use-cases/get-featured-movies.service';
import { GetMovieAssetsService } from 'src/application/use-cases/get-movie-assets.service';
import { GetNowPlayingMoviesService } from 'src/application/use-cases/get-now-playing-movies.service';
import { GetTopRatedMoviesService } from 'src/application/use-cases/get-top-rated-movies.service';
import { GetTrendingMoviesService } from 'src/application/use-cases/get-trending-movies.service';
import { TmdbClient } from 'src/infrastructure/tmdb/tmdb.client';
import { movieRepoProvider } from 'src/infrastructure/tmdb/tmdb.movie.repository';
import { MoviesController } from './movies.controller';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [
    GetFeaturedMoviesService,
    GetTrendingMoviesService,
    GetTopRatedMoviesService,
    GetNowPlayingMoviesService,
    GetMovieAssetsService,
    TmdbClient,
    movieRepoProvider,
  ],
})
export class MoviesModule {}
