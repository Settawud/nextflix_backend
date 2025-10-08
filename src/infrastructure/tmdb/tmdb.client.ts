import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { isAxiosError } from 'axios';

@Injectable()
export class TmdbClient {
  constructor(private readonly http: HttpService) {}

  async get<T>(path: string, params: Record<string, unknown> = {}): Promise<T> {
    try {
      const res = await this.http.axiosRef.request<T>({
        baseURL: process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3',
        url: path,
        method: 'GET',
        params,
        headers: { Authorization: `Bearer ${process.env.TMDB_BEARER}` },
        timeout: 5000,
      });
      return res.data;
    } catch (error: unknown) {
      if (process.env.NODE_ENV !== 'production') {
        const logPayload: {
          path: string;
          params: Record<string, unknown>;
          message: string;
          responseStatus?: number;
          responseData?: unknown;
        } = {
          path,
          params,
          message:
            error instanceof Error ? error.message : 'unknown tmdb error',
        };

        if (isAxiosError(error)) {
          logPayload.message = error.message;
          logPayload.responseStatus = error.response?.status;
          logPayload.responseData = error.response?.data;
        }

        console.error('[TMDB] request failed', logPayload);
      }
      throw error;
    }
  }
}
