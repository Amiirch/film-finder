import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenreRepository } from './genre.repository';
import { GenreDto } from 'src/dtos/genre-dto';
import { Genre } from './genre.schema';

@Injectable()
export class GenreService {
  constructor(private genreRepository: GenreRepository) {}

  async createGenre(genreRequest: GenreDto) {
    const existGenre = await this.genreRepository.getGenreByFullName(
      genreRequest.fullName,
    );
    if (existGenre != null)
      throw new HttpException(
        'genre with this name is already exists',
        HttpStatus.CONFLICT,
      );
    const genre: Genre = {
      fullName: genreRequest.fullName,
      description: genreRequest.description,
    };
    const createdGenre = await this.genreRepository.createGenre(genre);
    return createdGenre;
  }

  async getGenre(genreId: string) {
    const genre = await this.genreRepository.getGenre(genreId);
    if (genre == null)
      throw new HttpException(
        'genre with this Id isnt exist',
        HttpStatus.NOT_FOUND,
      );
    return genre;
  }

  async updateGenre(id: string, genre: GenreDto) {
    const existGenre = await this.genreRepository.getGenre(id);
    if (existGenre == null)
      throw new HttpException(
        'genre with this Id isnt exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedGenre = await this.genreRepository.updateGenre(id, genre);
    return updatedGenre;
  }

  async deleteGenre(id: string) {
    const existGenre = await this.genreRepository.getGenre(id);
    if (existGenre == null)
      throw new HttpException(
        'genre with this Id isnt exist',
        HttpStatus.NOT_FOUND,
      );
    const res = await this.genreRepository.deleteGenre(id);
    return res;
  }

  async getGenres() {
    const genres = await this.genreRepository.getGenres();
    return genres;
  }
}
