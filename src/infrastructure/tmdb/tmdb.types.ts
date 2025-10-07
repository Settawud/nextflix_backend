import type {
  MovieDetailSource,
  MovieSummarySource,
} from '../../domain/entities/movie';

export type TmdbPaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type TmdbMovieSummaryResponse =
  TmdbPaginatedResponse<MovieSummarySource>;

export type TmdbMovieSearchResponse = TmdbPaginatedResponse<MovieSummarySource>;

export type TmdbMovieDetailResponse = MovieDetailSource;
