import { Injectable } from "@nestjs/common";
import { MOVIE_REPO, MovieRepository} from "../../domain/repositories/movie.repository";
import { TmdbClient } from "./tmdb.client";
import { MovieDetail, MovieSummary, toMovieDetail, toMovieSummary } from "../../domain/entities/movie";

@Injectable()
export class TmdbMovieRepository implements MovieRepository {
    
    constructor(private tmdb: TmdbClient) {}

    async trending(): Promise<MovieSummary[]> { const d = await this.tmdb.get('/trending/all/week'); return (d.results??[]).map(toMovieSummary); }
    async topRated(): Promise<MovieSummary[]> { const d = await this.tmdb.get('/movie/top_rated'); return (d.results??[]).map(toMovieSummary); }
    async nowPlaying(): Promise<MovieSummary[]> { const d = await this.tmdb.get('/movie/now_playing'); return (d.results??[]).map(toMovieSummary); }
    async search(q:string, page:number) { const d = await this.tmdb.get('/search/movie', { query:q, page }); return (d.results??[]).map(toMovieSummary); }
    async byId(id:number): Promise<MovieDetail> { const d = await this.tmdb.get(`/movie/${id}`); return toMovieDetail(d); }
}
export const movieRepoProvider = { provide: MOVIE_REPO, useClass: TmdbMovieRepository };
