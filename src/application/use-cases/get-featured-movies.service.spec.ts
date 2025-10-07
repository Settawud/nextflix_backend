import type { MovieSummary } from '../../domain/entities/movie';
import type { MovieRepository } from '../../domain/repositories/movie.repository';
import { GetFeaturedMoviesService } from './get-featured-movies.service';

const sampleMovie: MovieSummary = {
  id: 1,
  title: 'A',
  posterPath: null,
  backdropPath: null,
  voteAverage: 7,
};

describe('GetFeaturedMoviesService', () => {
  it('aggregates three rails', async () => {
    const mockRepo: MovieRepository = {
      trending: () => Promise.resolve([sampleMovie]),
      topRated: () => Promise.resolve([]),
      nowPlaying: () => Promise.resolve([]),
      search: () => Promise.resolve([]),
      byId: () => Promise.reject(new Error('noop')),
    };

    const service = new GetFeaturedMoviesService(mockRepo);

    const result = await service.execute();

    expect(result.trending).toHaveLength(1);
    expect(result.top).toHaveLength(0);
    expect(result.now).toHaveLength(0);
  });
});
