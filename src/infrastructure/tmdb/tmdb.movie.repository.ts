import { Injectable } from '@nestjs/common';
import { isAxiosError } from 'axios';

import {
  MovieAssets,
  MovieDetail,
  MovieImageAssetSource,
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
  TmdbMovieImagesResponse,
  TmdbMovieSearchResponse,
  TmdbMovieSummaryResponse,
} from './tmdb.types';

const normalizeLanguage = (value?: string | null) =>
  (value ?? '').toLowerCase();

const scoreImageAsset = (asset?: MovieImageAssetSource | null) => {
  if (!asset?.file_path) {
    return Number.NEGATIVE_INFINITY;
  }
  const voteScore = (asset.vote_average ?? 0) * (asset.vote_count ?? 0);
  const widthBonus = (asset.width ?? 0) / 1000;
  return voteScore + widthBonus;
};

const pickPreferredAsset = (
  assets: MovieImageAssetSource[] | undefined,
  preferredLanguages: string[] = [],
) => {
  if (!assets?.length) {
    return undefined;
  }

  const pools = preferredLanguages
    .map((language) => {
      if (language === '') {
        return assets.filter(
          (asset) => normalizeLanguage(asset.iso_639_1) === '',
        );
      }
      const normalized = language.toLowerCase();
      return assets.filter(
        (asset) => normalizeLanguage(asset.iso_639_1) === normalized,
      );
    })
    .filter((group) => group.length > 0);

  const candidatePool = pools.length > 0 ? pools[0] : assets;

  return [...candidatePool].sort(
    (a, b) => scoreImageAsset(b) - scoreImageAsset(a),
  )[0];
};

const TEXTLESS_LANGUAGE_CODES = new Set(['', 'xx', 'und']);

const filterTextlessBackdrops = (assets: MovieImageAssetSource[] | undefined) =>
  assets?.filter((asset) => {
    const language = normalizeLanguage(asset.iso_639_1);
    if (!TEXTLESS_LANGUAGE_CODES.has(language)) {
      return false;
    }
    return (asset.aspect_ratio ?? 0) >= 1.6;
  });

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

  async assets(id: number): Promise<MovieAssets | null> {
    let detail: TmdbMovieDetailResponse;
    let images: TmdbMovieImagesResponse;

    try {
      [detail, images] = await Promise.all([
        this.tmdb.get<TmdbMovieDetailResponse>(`/movie/${id}`),
        this.tmdb.get<TmdbMovieImagesResponse>(`/movie/${id}/images`, {
          include_image_language: 'en,null,und,xx,th',
          language: '',
        }),
      ]);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }

    const textlessBackdrops = filterTextlessBackdrops(images.backdrops);
    const bestTextlessBackdrop = pickPreferredAsset(textlessBackdrops, [
      '',
      'xx',
      'und',
    ]);
    const bestBackdrop = pickPreferredAsset(images.backdrops, [
      '',
      'xx',
      'und',
      'en',
      'th',
    ]);
    const bestLogo = pickPreferredAsset(images.logos, ['en', 'th', '']);

    return {
      id: detail.id,
      title: detail.title ?? detail.name ?? '',
      backdropPath: bestBackdrop?.file_path ?? detail.backdrop_path ?? null,
      textlessBackdropPath: bestTextlessBackdrop?.file_path ?? null,
      logoPath: bestLogo?.file_path ?? null,
    };
  }
}

export const movieRepoProvider = {
  provide: MOVIE_REPO,
  useClass: TmdbMovieRepository,
};
