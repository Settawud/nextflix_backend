import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MoviesController } from './movies.controller';
import { GetFeaturedMoviesService } from 'src/application/use-cases/get-featured-movies.service';
import { TmdbClient } from 'src/infrastructure/tmdb/tmdb.client';
import { movieRepoProvider } from 'src/infrastructure/tmdb/tmdb.movie.repository';

@Module({
    imports: [HttpModule],
    controllers: [MoviesController],
    providers: [GetFeaturedMoviesService, TmdbClient, movieRepoProvider],
})

export class MoviesModule {}