import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoGamesModule } from './video-games/video-games.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@videogamereviews.ot9nw.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(MONGODB_URI),
    VideoGamesModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
