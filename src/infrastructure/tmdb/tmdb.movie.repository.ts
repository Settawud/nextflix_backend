import { Injectable } from '@nestjs/common';

import {
  MovieDetail,
  MovieSummary,
  toMovieDetail,
  toMovieSummary,
} from '../../domain/entities/movie';
import {
  MOVIE_REPO,
  MovieRepository,
} from '../../domain/repositories/movie.repository';
import { TmdbClient } from './tmdb.client';
import {
  TmdbMovieDetailResponse,
  TmdbMovieSearchResponse,
  TmdbMovieSummaryResponse,
} from './tmdb.types';

@Injectable()
export class TmdbMovieRepository implements MovieRepository {
  constructor(private readonly tmdb: TmdbClient) {}

  async trending(): Promise<MovieSummary[]> {
    const data =
      await this.tmdb.get<TmdbMovieSummaryResponse>('/trending/all/week');
    return (data.results ?? []).map(toMovieSummary);
  }

  async topRated(): Promise<MovieSummary[]> {
    const data =
      await this.tmdb.get<TmdbMovieSummaryResponse>('/movie/top_rated');
    return (data.results ?? []).map(toMovieSummary);
  }

  async nowPlaying(): Promise<MovieSummary[]> {
    const data =
      await this.tmdb.get<TmdbMovieSummaryResponse>('/movie/now_playing');
    return (data.results ?? []).map(toMovieSummary);
  }

  async search(query: string, page: number): Promise<MovieSummary[]> {
    const data = await this.tmdb.get<TmdbMovieSearchResponse>('/search/movie', {
      query,
      page,
    });
    return (data.results ?? []).map(toMovieSummary);
  }

  async byId(id: number): Promise<MovieDetail> {
    const data = await this.tmdb.get<TmdbMovieDetailResponse>(`/movie/${id}`);
    return toMovieDetail(data);
  }
}

export const movieRepoProvider = {
  provide: MOVIE_REPO,
  useClass: TmdbMovieRepository,
};
