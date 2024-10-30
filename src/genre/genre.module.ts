import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './genre.schema';
import { GenreService } from './genre.service';
import { GenreRepository } from './genre.repository';
import { Movie, MovieSchema } from 'src/movie/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [GenreController],
  providers: [GenreService, GenreRepository],
})
export class GenreModule {}
