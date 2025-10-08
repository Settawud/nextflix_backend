import { Inject, Injectable } from '@nestjs/common';

import type { MovieRepository } from '../../domain/repositories/movie.repository';
import { MOVIE_REPO } from '../../domain/repositories/movie.repository';
import type { MovieSummary } from '../../domain/entities/movie';

@Injectable()
export class GetNowPlayingMoviesService {
  constructor(@Inject(MOVIE_REPO) private readonly repo: MovieRepository) {}

  execute(): Promise<MovieSummary[]> {
    return this.repo.nowPlaying();
  }
}
