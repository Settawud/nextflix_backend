export type MovieSummary = {
    id: number; title: string; posterPath: string|null; backdropPath: string|null; voteAverage: number;
}

export type MovieDetail = MovieSummary & { overview: string; releaseDate: string|null; genres: string[]};

export const toMovieSummary = (r:any): MovieSummary => ({
    id: r.id, 
    title: r.title ?? r.name ?? '',
    posterPath: r.poster_path ?? null,
    backdropPath: r.backgrop_path ?? null,
    voteAverage: r.vote_average ?? 0,  
});

export const toMovieDetail = (r:any): MovieDetail => ({
    ...toMovieSummary(r),
    overview: r.overview ?? '',
    releaseDate: r.release_date ?? r.first_air_date ?? null,
    genres: Array.isArray(r.genres) ? r.genres.map((g:any)=>g.name) : [],
});