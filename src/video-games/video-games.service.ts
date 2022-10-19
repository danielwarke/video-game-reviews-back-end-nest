import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VideoGame } from './schemas/video-game.schema';
import { Model } from 'mongoose';
import { CreateVideoGameDto } from './dto/create-video-game.dto';

@Injectable()
export class VideoGamesService {
  constructor(
    @InjectModel(VideoGame.name) private videoGameModel: Model<any>,
  ) {}

  async create(createVideoGameDto: CreateVideoGameDto): Promise<VideoGame> {
    const createdVideoGame = new this.videoGameModel(createVideoGameDto);
    return createdVideoGame.save();
  }

  async findAll(): Promise<VideoGame[]> {
    return this.videoGameModel.find().exec();
  }
}
