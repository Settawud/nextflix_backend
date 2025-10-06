import { GetFeaturedMoviesService } from './get-featured-movies.service';
import { MovieRepository } from '../../domain/repositories/movie.repository';

test('aggregates three rails', async () => {
  const mockRepo: MovieRepository = {
    trending: async () => [{ id:1, title:'A', posterPath:null, backdropPath:null, voteAverage:7 }],
    topRated: async () => [], nowPlaying: async () => [],
    search: async () => [], byId: async () => { throw new Error('noop'); }
  };
  const svc = new GetFeaturedMoviesService({} as any);
  
  // @ts-expect-error test injection
  svc.repo = mockRepo;
  const res = await svc.execute();
  expect(res.trending.length).toBe(1);
});
