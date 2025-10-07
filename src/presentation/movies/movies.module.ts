import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { GetFeaturedMoviesService } from 'src/application/use-cases/get-featured-movies.service';
import { TmdbClient } from 'src/infrastructure/tmdb/tmdb.client';
import { movieRepoProvider } from 'src/infrastructure/tmdb/tmdb.movie.repository';

import { MoviesController } from './movies.controller';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [GetFeaturedMoviesService, TmdbClient, movieRepoProvider],
})
export class MoviesModule {}
