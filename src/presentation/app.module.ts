import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule, MoviesModule],
})
export class AppModule {}
