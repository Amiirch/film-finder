import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './genre.schema';
import { Movie } from 'src/movie/movie.schema';

@Injectable()
export class GenreRepository {
  constructor(
    @InjectModel('Genre') private readonly genreModel: Model<Genre>,
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  async createGenre(genre: Genre): Promise<Genre> {
    const createdGenre = new this.genreModel(genre);
    return createdGenre.save();
  }

  async getGenre(genreId: string) {
    const genre = await this.genreModel.findById(genreId);
    return genre;
  }

  async updateGenre(id: string, genre: Genre) {
    const updatedGenre = this.genreModel.findByIdAndUpdate(id, genre, {
      new: true,
    });
    return updatedGenre;
  }

  async deleteGenre(id: string) {
    const res = await this.genreModel.findByIdAndDelete(id);
    return res;
  }

  async getGenres() {
    const genres = await this.genreModel.find({});
    return genres;
  }

  async getGenreByFullName(fullName: string) {
    const res = await this.genreModel.findOne({
      fullName: fullName,
    });
    return res;
  }
}
