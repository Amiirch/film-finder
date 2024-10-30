import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dtos/user-dto';
import { SignInDto } from 'src/dtos/user-dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: UserDto, @Res() res: Response) {
    try {
      const signedUpData = await this.authService.signup(data);
      return res.status(HttpStatus.CREATED).send(signedUpData);
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

  @Post('login')
  async signIn(@Body() data: SignInDto, @Res() res: Response) {
    try {
      const token = await this.authService.signIn(data);
      return res.status(HttpStatus.OK).send(token);
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
