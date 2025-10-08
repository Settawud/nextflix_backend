import { Inject, Injectable } from '@nestjs/common';

import type { MovieAssets } from '../../domain/entities/movie';
import {
  MOVIE_REPO,
  MovieRepository,
} from '../../domain/repositories/movie.repository';

@Injectable()
export class GetMovieAssetsService {
  constructor(@Inject(MOVIE_REPO) private readonly repo: MovieRepository) {}

  execute(id: number): Promise<MovieAssets | null> {
    return this.repo.assets(id);
  }
}
