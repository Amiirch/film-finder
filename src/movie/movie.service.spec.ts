import { MovieService } from './movie.service';
import { MovieRepository } from './movie.repository';
import { GenreRepository } from '../genre/genre.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Movie } from './movie.schema';

jest.mock('./movie.repository');
jest.mock('../genre/genre.repository');

describe('MovieService', () => {
  let service: MovieService;
  let movieRepository: jest.Mocked<MovieRepository>;
  let genreRepository: jest.Mocked<GenreRepository>;

  beforeEach(async () => {
    movieRepository = new (<new () => MovieRepository>(
      MovieRepository
    ))() as jest.Mocked<MovieRepository>;

    genreRepository = new (<new () => GenreRepository>(
      GenreRepository
    ))() as jest.Mocked<GenreRepository>;

    service = new MovieService(movieRepository, genreRepository);
  });

  it('successfull get moveie scenario', async () => {
    const movieData = {
      _id: '6706ae1f6cc7cf52cc0b68e7',
      fullName: 'docker',
      description:
        'The film follows a former CIA agent who is recruited into a secret organization',
      director: 'Christopher Nolan',
      budget: '300 million $',
      rating: 8.5,
      country: 'USA',
      releasedAt: 2019,
      genres: ['670162d54f718d94b7ed585c'],
    };

    movieRepository.getMovie = jest.fn().mockReturnValue(movieData);
    const result = await service.getMovie('6706ae1f6cc7cf52cc0b68e7');

    expect(result).toEqual(movieData);
    expect(movieRepository.getMovie).toHaveBeenCalledWith(
      '6706ae1f6cc7cf52cc0b68e7',
    );
    expect(movieRepository.getMovie).toHaveBeenCalledTimes(1);
  });

  it('not exist movie by id scenario', async () => {
    movieRepository.getMovie.mockResolvedValueOnce(null);

    await expect(service.getMovie('non-existent-id')).rejects.toThrow(
      HttpException,
    );
    await expect(service.getMovie('non-existent-id')).rejects.toThrow(
      'movie is not exist',
    );
    await expect(HttpStatus.NOT_FOUND);
  });

  it('create Movie Successfully', async () => {
    const createMovieRequest = {
      fullName: 'docker',
      description:
        'The film follows a former CIA agent who is recruited into a secret organization',
      director: 'cristopher nolan',
      budget: '300milion $',
      rating: 8.5,
      country: 'USA',
      releasedAt: 2019,
      genres: ['670162d54f718d94b7ed585c'],
    } as unknown as Movie;
    movieRepository.getMovieByFullName.mockResolvedValueOnce(null);

    movieRepository.createMovie = jest.fn().mockReturnValue(createMovieRequest);

    const result = await service.createMovie(createMovieRequest);

    await expect(result).toEqual(createMovieRequest);
    expect(movieRepository.createMovie).toHaveBeenCalledWith(
      createMovieRequest,
    );
    expect(movieRepository.createMovie).toHaveBeenCalledTimes(1);
  });

  it('create Movie fail scenario', async () => {
    const createMovieRequest = {
      fullName: 'docker',
      description:
        'The film follows a former CIA agent who is recruited into a secret organization',
      director: 'cristopher nolan',
      budget: '300milion $',
      rating: 8.5,
      country: 'USA',
      releasedAt: 2019,
      genres: ['670162d54f718d94b7ed585c'],
    } as unknown as Movie;
    movieRepository.getMovieByFullName = jest
      .fn()
      .mockReturnValue(createMovieRequest);

    await expect(service.createMovie(createMovieRequest)).rejects.toThrow(
      HttpException,
    );
    await expect(service.createMovie(createMovieRequest)).rejects.toThrow(
      'movie with this name is already exist',
    );
    await expect(HttpStatus.CONFLICT);
  });

  it('update Movie Successfully', async () => {
    const existMovie = {
      fullName: 'docker1',
      description:
        'The film follows a former CIA agent who is recruited into a secret organization',
      director: 'cristopher nolan',
      budget: '300milion $',
      rating: 8.5,
      country: 'USA',
      releasedAt: 2019,
      genres: ['670162d54f718d94b7ed585c'],
    } as unknown as Movie;

    const updateMovieRequest = {
      fullName: 'docker',
      description:
        'The film follows a former CIA agent who is recruited into a secret organization',
      director: 'cristopher nolan',
      budget: '300milion $',
      rating: 8.5,
      country: 'USA',
      releasedAt: 2019,
      genres: ['670162d54f718d94b7ed585c'],
    } as unknown as Movie;

    const requestMovieId = '6706ae1f6cc7cf52cc0b68e7';
    movieRepository.getMovie = jest.fn().mockReturnValue(existMovie);
    movieRepository.updateMovie = jest.fn().mockReturnValue(updateMovieRequest);

    const result = await service.updateMovie(
      requestMovieId,
      updateMovieRequest,
    );

    expect(result).not.toEqual(existMovie);
    expect(result.fullName).toEqual('docker');
    expect(movieRepository.updateMovie).toHaveBeenCalledWith(
      requestMovieId,
      updateMovieRequest,
    );
    expect(movieRepository.updateMovie).toHaveBeenCalledTimes(1);
  });

  it('update Movie fail scenario', async () => {
    const updateMovieRequest = {
      fullName: 'docker',
      description:
        'The film follows a former CIA agent who is recruited into a secret organization',
      director: 'cristopher nolan',
      budget: '300milion $',
      rating: 8.5,
      country: 'USA',
      releasedAt: 2019,
      genres: ['670162d54f718d94b7ed585c'],
    } as unknown as Movie;
    const requestMovieId = '6706ae1f6cc7cf52cc0b68e7';
    movieRepository.getMovie.mockResolvedValueOnce(null);

    await expect(
      service.updateMovie(requestMovieId, updateMovieRequest),
    ).rejects.toThrow(HttpException);
    await expect(
      service.updateMovie(requestMovieId, updateMovieRequest),
    ).rejects.toThrow('movie with this id is not exist');
    await expect(HttpStatus.NOT_FOUND);
  });

  it('delete Movie Successfully', async () => {
    const requestMovieId = '6706ae1f6cc7cf52cc0b68e7';
    const existMovie = {
      fullName: 'docker',
      description:
        'The film follows a former CIA agent who is recruited into a secret organization',
      director: 'cristopher nolan',
      budget: '300milion $',
      rating: 8.5,
      country: 'USA',
      releasedAt: 2019,
      genres: ['670162d54f718d94b7ed585c'],
    } as unknown as Movie;

    movieRepository.getMovie = jest.fn().mockReturnValue(existMovie);

    await service.deleteMovie(requestMovieId);

    expect(movieRepository.getMovie).toHaveBeenCalledWith(requestMovieId);
    expect(movieRepository.deleteMovie).toHaveBeenCalledWith(requestMovieId);
  });

  it('delete Movie fail scenario', async () => {
    const requestMovieId = '6706ae1f6cc7cf52cc0b68e7';

    movieRepository.getMovie.mockResolvedValueOnce(null);

    await expect(service.deleteMovie(requestMovieId)).rejects.toThrow(
      HttpException,
    );
    await expect(service.deleteMovie(requestMovieId)).rejects.toThrow(
      'movie with this id is not exist',
    );
    expect(HttpStatus.NOT_FOUND);
  });
  it('Get Movies by genraId fail scenario', async () => {
    const requestGenreId = '6706ae1f6cc7cf52cc0b68e7';

    genreRepository.getGenre.mockResolvedValueOnce(null);

    await expect(service.getMoviesByGenreId(requestGenreId)).rejects.toThrow(
      HttpException,
    );
    await expect(service.getMoviesByGenreId(requestGenreId)).rejects.toThrow(
      'genre with this id is not exist',
    );
    expect(HttpStatus.NOT_FOUND);
  });
  it('Get Movies by genraId successfully', async () => {
    const existMovies = [
      {
        fullName: 'docker',
        description:
          'The film follows a former CIA agent who is recruited into a secret organization',
        director: 'cristopher nolan',
        budget: '300milion $',
        rating: 8.5,
        country: 'USA',
        releasedAt: 2019,
        genres: ['670162d54f718d94b7ed585c'],
      },
      {
        fullName: 'docker2',
        description:
          'The film follows a former CIA agent who is recruited into a secret organization2',
        director: 'cristopher nolan',
        budget: '500milion $',
        rating: 7.5,
        country: 'Germany',
        releasedAt: 2022,
        genres: ['670162d54f718d94b7ed585c'],
      },
    ] as unknown as Movie[];
    const existGenre = {
      _id: '6706ad2227ca2837ed221c7d',
      fullName: 'docker',
      description: 'docker12',
      __v: 0,
    };
    const requestGenreId = '6706ae1f6cc7cf52cc0b68e7';

    genreRepository.getGenre = jest.fn().mockReturnValue(existGenre);
    movieRepository.getMoviesByGenreId = jest.fn().mockReturnValue(existMovies);
    const result = await service.getMoviesByGenreId(requestGenreId);

    expect(result[0].fullName).toBe('docker');
    expect(result[1].fullName).toBe('docker2');
    expect(result).toHaveLength(2);
  });
});
