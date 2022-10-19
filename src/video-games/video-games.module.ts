import { Module } from '@nestjs/common';
import { VideoGamesController } from './video-games.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoGame, VideoGameSchema } from './schemas/video-game.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VideoGame.name, schema: VideoGameSchema },
    ]),
  ],
  controllers: [VideoGamesController],
  exports: [MongooseModule],
})
export class VideoGamesModule {}
