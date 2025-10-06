import { Injectable, Inject } from "@nestjs/common";
import { MOVIE_REPO } from "../../domain/repositories/movie.repository"; // MOVIE_REPO เป็น value (symbol)
import type { MovieRepository } from "../../domain/repositories/movie.repository"; // MovieRepository เป็น type

import { MovieSummary } from "../../domain/entities/movie";

@Injectable()
export class GetFeaturedMoviesService {
    constructor(@Inject(MOVIE_REPO) private repo: MovieRepository) {}

    async execute(): Promise<{ trending: MovieSummary[]; top: MovieSummary[]; now: MovieSummary[] }> {
        const [trending, top, now] = await Promise.all([this.repo.trending(), this.repo.topRated(), this.repo.nowPlaying()]);
        return {trending, top, now};
    }
}