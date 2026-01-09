import { Inject, Injectable, Logger } from '@nestjs/common';

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
  private readonly logger = new Logger(GetFeaturedMoviesService.name);

  constructor(@Inject(MOVIE_REPO) private readonly repo: MovieRepository) {}

  async execute(): Promise<FeaturedRails> {
    const [trending, top, now] = await Promise.all([
      this.repo.trending(),
      this.repo.topRated(),
      this.repo.nowPlaying(),
    ]);
    const heroSummary = trending[0];

    let hero: FeaturedRails['hero'] = null;

    if (heroSummary?.id) {
      try {
        const [detail, assets] = await Promise.all([
          this.repo.byId(heroSummary.id),
          this.repo.assets(heroSummary.id),
        ]);
        
        // ✅ Check ว่า detail มีค่า
        if (detail) {
          hero = {
            detail,
            assets: assets || null,
          };
        }
      } catch (error) {
        // ✅ Log แต่ไม่ throw error ให้ API ยังส่ง trending/top/now ได้
        this.logger.warn(`Failed to fetch hero movie ${heroSummary.id}:`, error);
      }
    }

    return { hero, trending, top, now };
  }
}