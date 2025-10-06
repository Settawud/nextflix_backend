import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TmdbClient {
    constructor(private http: HttpService) {}
    async get(path: string, params:Record<string, any> = {}) {
        const res = await this.http.axiosRef.request({
            baseURL: process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3',
            url: path,
            method: 'GET',
            params,
            headers: { Authorization: `Bearer ${process.env.TMDB_BEARER}` },
            timeout: 5000,
        });
        return res.data;
    }
}
