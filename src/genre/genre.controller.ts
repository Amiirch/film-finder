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
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { GenreService } from './genre.service';
import { GenreDto } from 'src/dtos/genre-dto';
import { Response } from 'express';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post()
  async createGenre(@Body() genre: GenreDto, @Res() res: Response) {
    try {
      const createdGenre = await this.genreService.createGenre(genre);
      return res.status(HttpStatus.CREATED).send(createdGenre);
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

  @Get(':genreId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async getGenre(@Param('genreId') genreId: string, @Res() res: Response) {
    try {
      const genre = await this.genreService.getGenre(genreId);
      return res.status(HttpStatus.OK).send(genre);
    } catch (err) {
      if (err instanceof HttpException) {
        const status = err.getStatus();
        const message = err.getResponse()['message'] || err.message;
        return res.status(status).json({
          statusCode: status,
          message: message,
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async updateGenre(
    @Param('id') id: string,
    @Body() genre: GenreDto,
    @Res() res: Response,
  ) {
    try {
      const updatedGenre = await this.genreService.updateGenre(id, genre);
      return res.status(HttpStatus.OK).send(updatedGenre);
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
  async deleteGenre(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.genreService.deleteGenre(id);
      return res.status(HttpStatus.OK).send('genre deleted successfully');
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

  @Get('')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async getGenres(@Res() res: Response) {
    try {
      const genres = await this.genreService.getGenres();
      return res.status(HttpStatus.OK).send(genres);
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
}
