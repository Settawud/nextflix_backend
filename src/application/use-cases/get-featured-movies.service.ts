import { Inject, Injectable } from '@nestjs/common';

import type { MovieRepository } from '../../domain/repositories/movie.repository';
import { MOVIE_REPO } from '../../domain/repositories/movie.repository';
import type { MovieSummary } from '../../domain/entities/movie';

type FeaturedRails = {
  trending: MovieSummary[];
  top: MovieSummary[];
  now: MovieSummary[];
};

@Injectable()
export class GetFeaturedMoviesService {
  constructor(@Inject(MOVIE_REPO) private readonly repo: MovieRepository) {}

  async execute(): Promise<FeaturedRails> {
    const [trending, top, now] = await Promise.all([
      this.repo.trending(),
      this.repo.topRated(),
      this.repo.nowPlaying(),
    ]);
    return { trending, top, now };
  }
}
