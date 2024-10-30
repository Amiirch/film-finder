import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles } from './../decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Movie } from './movie.schema';
import { MovieService } from './movie.service';
import { MovieDto } from 'src/dtos/movie-dto';
import { Response } from 'express';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async createMovie(@Body() movie: Movie, @Res() res: Response) {
    try {
      const createdMovie = await this.movieService.createMovie(movie);
      return res.status(HttpStatus.CREATED).send(createdMovie);
    } catch (err) {
      if (err instanceof HttpException) {
        const status = err.getStatus();
        const message = err.getResponse()['message'] || err.message;
        return res.status(status).json({
          statusCode: status,
          message: message,
        });
      }
    }
  }

  @Get(':movieId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  async getMovie(@Param('movieId') movieId: string, @Res() res?: Response) {
    try {
      const movie = await this.movieService.getMovie(movieId);
      return res.status(HttpStatus.OK).send(movie);
    } catch (err) {
      if (err instanceof HttpException) {
        const status = err.getStatus();
        const message = err.getResponse()['message'] || err.message;
        return res.status(status).json({
          statusCode: status,
          message: message,
        });
      }
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async updateMovie(
    @Param('id') id: string,
    @Body() movie: MovieDto,
    @Res() res: Response,
  ) {
    try {
      const updatedMovie = await this.movieService.updateMovie(id, movie);
      return res.status(HttpStatus.OK).send(updatedMovie);
    } catch (err) {
      if (err instanceof HttpException) {
        const status = err.getStatus();
        const message = err.getResponse()['message'] || err.message;
        return res.status(status).json({
          statusCode: status,
          message: message,
        });
      }
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async deleteMovie(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.movieService.deleteMovie(id);
      return res.status(HttpStatus.OK).send('movie deleted successfully');
    } catch (err) {
      if (err instanceof HttpException) {
        const status = err.getStatus();
        const message = err.getResponse()['message'] || err.message;
        return res.status(status).json({
          statusCode: status,
          message: message,
        });
      }
    }
  }

  @Get('genre/:genreId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  async getMoviesByGenreId(
    @Param('genreId') genreId: string,
    @Res() res: Response,
  ) {
    try {
      const movies = await this.movieService.getMoviesByGenreId(genreId);
      return res.status(HttpStatus.OK).send(movies);
    } catch (err) {
      if (err instanceof HttpException) {
        const status = err.getStatus();
        const message = err.getResponse()['message'] || err.message;
        return res.status(status).json({
          statusCode: status,
          message: message,
        });
      }
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
