# Nextflix Backend

NestJS API that aggregates data from The Movie Database (TMDB) and exposes clean endpoints for the Nextflix frontend. Features include curated rails, detail lookups, search, and rich asset retrieval (logo/textless backdrops) to support the title overlay experience.

## Live Resources

- Base URL: https://nextflix-backend-j6ve.onrender.com
- Health check: `GET /` (Nest default)
- Featured movies: `GET /api/movies/featured`
- Assets for a title: `GET /api/movies/{id}/assets`
- Public frontend consuming this API: https://nextflix-frontend-hl577w1cq-settawuds-projects.vercel.app/

## Tech Stack

- **Runtime**: Node.js 20, NestJS 11
- **HTTP**: Axios via `@nestjs/axios`
- **Architecture**: Clean layering (domain entities, use-cases, repository abstraction)
- **Infrastructure**: TMDB REST integration with logo/backdrop selection heuristics
- **Testing**: Jest unit tests for use-cases

## Getting Started Locally

1. Install dependencies

   ```bash
   npm install
   ```

2. Create an environment file

   ```bash
   cp .env.example .env
   # fill in TMDB_BEARER with your TMDB API v4 access token
   ```

   | Variable | Purpose |
   | --- | --- |
   | `PORT` | API port (default 3001) |
   | `TMDB_BASE_URL` | TMDB API root, usually `https://api.themoviedb.org/3` |
   | `TMDB_BEARER` | TMDB API v4 token (required) |
   | `FRONTEND_ORIGINS` | Comma-separated list for CORS (e.g. `http://localhost:3000`) |

3. Start the server

   ```bash
   npm run start:dev
   ```

   The API will be available at http://localhost:3001.

## Scripts

| Command | Description |
| --- | --- |
| `npm run start` | Production mode (compiled) |
| `npm run start:dev` | Watch mode with hot-reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run lint` | ESLint with strict TypeScript rules |
| `npm run test` | Jest unit tests |

## Architecture Overview

```
src/
  domain/
    entities/         # MovieSummary, MovieDetail, MovieAssets types + mappers
    repositories/     # MovieRepository interface (trending/top/now/detail/assets)
  application/
    use-cases/        # Orchestrate repository calls (e.g., GetFeaturedMoviesService)
  infrastructure/
    tmdb/             # TmdbClient for HTTP + TmdbMovieRepository implementation
  presentation/
    movies/           # Nest controller + module wiring endpoints
```

- The repository interface hides TMDB specifics from the rest of the codebase.
- `TmdbMovieRepository` enriches base data by selecting high-quality logos and textless backdrops.
- The new `GetMovieAssetsService` powers `/api/movies/{id}/assets`, enabling the frontend to render branded overlays.

## API Surface

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/movies/featured` | Returns `{ trending, top, now }` rails |
| `GET` | `/api/movies/trending` | Weekly trending titles |
| `GET` | `/api/movies/top-rated` | Highest rated titles |
| `GET` | `/api/movies/now-playing` | Currently playing titles |
| `GET` | `/api/movies/search?q=...&page=...` | Search TMDB catalogue |
| `GET` | `/api/movies/{id}` | Detailed metadata for a specific movie |
| `GET` | `/api/movies/{id}/assets` | Logo, backdrop, and textless backdrops selection |

All responses are JSON; errors return standard NestJS problem details. Upstream TMDB errors are logged (non-production) with safe metadata for easier debugging.

## Quality & Testing

- **Lint**: `npm run lint` (ESLint strict rules, including `@typescript-eslint/no-unsafe-*`)
- **Unit test**: `npm run test` (covers `GetFeaturedMoviesService`)
- **Manual checks**:
  - Verify `/api/movies/featured` returns 3 arrays with >0 items
  - Hit `/api/movies/{id}/assets` and confirm `logoPath` / `textlessBackdropPath` values when available
  - Exercise `/api/movies/search?q=inception`

## Deployment Notes

- Hosted on **Render** (Node service). Build command `npm install && npm run build`, start command `npm run start`.
- Ensure environment variables (`TMDB_BEARER`, `FRONTEND_ORIGINS`) are defined in Render dashboard.
- CORS is controlled via `FRONTEND_ORIGINS` to allow the Vercel frontend.

## Roadmap Ideas

- Cache TMDB responses (Redis) to reduce latency and API quota usage.
- Add `/api/movies/{id}/highlights` to surface cast & crew featured on the UI.
- Expand test coverage with integration tests (supertest) and contract snapshots.
