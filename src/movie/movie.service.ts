import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { Movie } from './movie.schema';
import { GenreRepository } from '../genre/genre.repository';
import { MovieDto } from 'src/dtos/movie-dto';

@Injectable()
export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private genreRepository: GenreRepository,
  ) {}
  async createMovie(movie: Movie) {
    const existMovie = await this.movieRepository.getMovieByFullName(
      movie.fullName,
    );
    if (existMovie != null)
      throw new HttpException(
        'movie with this name is already exist',
        HttpStatus.CONFLICT,
      );
    const createdMovie = await this.movieRepository.createMovie(movie);
    return createdMovie;
  }
  async getMovie(movieId: string) {
    const movie = await this.movieRepository.getMovie(movieId);
    if (movie == null)
      throw new HttpException('movie is not exist', HttpStatus.NOT_FOUND);
    return movie;
  }
  async updateMovie(id: string, movie: MovieDto) {
    const existMovie = await this.movieRepository.getMovie(id);
    if (existMovie == null)
      throw new HttpException(
        'movie with this id is not exist',
        HttpStatus.NOT_FOUND,
      );

    const updatedMovie = this.movieRepository.updateMovie(id, movie);
    return updatedMovie;
  }
  async deleteMovie(id: string) {
    const existMovie = await this.movieRepository.getMovie(id);
    if (existMovie == null)
      throw new HttpException(
        'movie with this id is not exist',
        HttpStatus.NOT_FOUND,
      );
    const res = await this.movieRepository.deleteMovie(id);
    return res;
  }
  async getMoviesByGenreId(genreId: string) {
    const genre = await this.genreRepository.getGenre(genreId);
    if (genre == null)
      throw new HttpException(
        'genre with this id is not exist',
        HttpStatus.NOT_FOUND,
      );
    const res = await this.movieRepository.getMoviesByGenreId(genreId);
    return res;
  }
}
