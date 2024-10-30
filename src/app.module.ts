import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { ChatGateway } from './support/chat.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'docker'
        ? 'mongodb://mongo:27017/film_finder'
        : 'mongodb://localhost:27017/film_finder',
    ),
    UserModule,
    AuthModule,
    MovieModule,
    GenreModule,
    ChatGateway,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
