import { Injectable, Inject } from "@nestjs/common";
import { MOVIE_REPO, MovieRepository } from "../../domain/repositories/movie.repository";
import { MovieSummary } from "../../domain/entities/movie";

@Injectable()
export class GetFeaturedMoviesService {
    constructor(@Inject(MOVIE_REPO) private repo: MovieRepository) {}

    async execute(): Promise<{ trending: MovieSummary[]; top: MovieSummary[]; now: MovieSummary[] }> {
        const [trending, top, now] = await Promise.all([this.repo.trending(), this.repo.topRated(), this.repo.nowPlaying()]);
        return {trending, top, now};
    }
}