import { MovieSummary, MovieDetail } from "../entities/movie";

export interface MovieRepository {
    trending(): Promise<MovieSummary[]>;
    topRated(): Promise<MovieSummary[]>;
    nowPlaying(): Promise<MovieSummary[]>;
    search(q:string, page:number): Promise<MovieSummary[]>;
    byId(id:number): Promise<MovieDetail>;
}
export const MOVIE_REPO = Symbol('MovieRepository');