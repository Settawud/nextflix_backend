export type MovieSummary = {
  id: number;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number;
};

export type MovieDetail = MovieSummary & {
  overview: string;
  releaseDate: string | null;
  genres: string[];
};

export type MovieSummarySource = {
  id: number;
  title?: string | null;
  name?: string | null;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number | null;
};

export type MovieDetailSource = MovieSummarySource & {
  overview?: string | null;
  release_date?: string | null;
  first_air_date?: string | null;
  genres?: Array<{ name?: string | null }> | null;
};

export const toMovieSummary = (source: MovieSummarySource): MovieSummary => ({
  id: source.id,
  title: source.title ?? source.name ?? '',
  posterPath: source.poster_path ?? null,
  backdropPath: source.backdrop_path ?? null,
  voteAverage: source.vote_average ?? 0,
});

export const toMovieDetail = (source: MovieDetailSource): MovieDetail => ({
  ...toMovieSummary(source),
  overview: source.overview ?? '',
  releaseDate: source.release_date ?? source.first_air_date ?? null,
  genres: Array.isArray(source.genres)
    ? source.genres
        .map((genre) => genre?.name)
        .filter(
          (name): name is string => typeof name === 'string' && name.length > 0,
        )
    : [],
});
