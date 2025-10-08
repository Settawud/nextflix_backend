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
  it('aggregates rails and hydrates hero', async () => {
    const mockRepo: MovieRepository = {
      trending: () => Promise.resolve([sampleMovie]),
      topRated: () => Promise.resolve([]),
      nowPlaying: () => Promise.resolve([]),
      search: () => Promise.resolve([]),
      byId: async () => ({
        ...sampleMovie,
        overview: 'Hello',
        releaseDate: null,
        genres: [],
      }),
      assets: async () => ({
        id: sampleMovie.id,
        title: sampleMovie.title,
        backdropPath: null,
        textlessBackdropPath: null,
        logoPath: null,
      }),
    };

    const service = new GetFeaturedMoviesService(mockRepo);

    const result = await service.execute();

    expect(result.trending).toHaveLength(1);
    expect(result.top).toHaveLength(0);
    expect(result.now).toHaveLength(0);
    expect(result.hero?.detail.id).toBe(sampleMovie.id);
  });
});
