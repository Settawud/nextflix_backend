import { Inject, Injectable } from '@nestjs/common';

import type { MovieRepository } from '../../domain/repositories/movie.repository';
import { MOVIE_REPO } from '../../domain/repositories/movie.repository';
import type { MovieAssets, MovieDetail, MovieSummary } from '../../domain/entities/movie';

type FeaturedRails = {
  hero: {
    detail: MovieDetail;
    assets: MovieAssets | null;
  } | null;
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
    const heroSummary = trending[0];

    let hero: FeaturedRails['hero'] = null;

    if (heroSummary) {
      const [detail, assets] = await Promise.all([
        this.repo.byId(heroSummary.id),
        this.repo.assets(heroSummary.id),
      ]);
      hero = {
        detail,
        assets,
      };
    }

    return { hero, trending, top, now };
  }
}
