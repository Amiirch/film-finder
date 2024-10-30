import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { MovieRepository } from './movie.repository';
import { Genre, GenreSchema } from 'src/genre/genre.schema';
import { GenreRepository } from 'src/genre/genre.repository';
import { MovieService } from './movie.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [MovieController],
  providers: [MovieRepository, GenreRepository, MovieService],
})
export class MovieModule {}
