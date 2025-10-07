import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TmdbClient {
  constructor(private readonly http: HttpService) {}

  async get<T>(path: string, params: Record<string, unknown> = {}): Promise<T> {
    const res = await this.http.axiosRef.request<T>({
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
