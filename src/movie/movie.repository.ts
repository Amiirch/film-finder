import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie.schema';
import { Genre } from 'src/genre/genre.schema';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    @InjectModel('Genre') private readonly genreModel: Model<Genre>,
  ) {}

  async createMovie(movie: Movie): Promise<Movie> {
    const createdMovie = new this.movieModel(movie);
    await createdMovie.save();
    return createdMovie;
  }

  async getMovie(movieId: string): Promise<Movie | null> {
    const movie = await this.movieModel.findById(movieId).lean().exec();
    return movie;
  }

  async updateMovie(id: string, movie: Movie): Promise<Movie> {
    const updatedMovie = this.movieModel.findByIdAndUpdate(id, movie, {
      new: true,
    });
    return updatedMovie;
  }

  async deleteMovie(id: string) {
    await this.movieModel.findByIdAndDelete(id);
  }
  async getMoviesByGenreId(genreId: string): Promise<Movie[] | null> {
    const movies = await this.movieModel.find({
      genres: genreId,
    });
    return movies;
  }
  async getMovieByFullName(fullName: string) {
    const movie = await this.movieModel.findOne({
      fullName: fullName,
    });
    return movie;
  }
}
