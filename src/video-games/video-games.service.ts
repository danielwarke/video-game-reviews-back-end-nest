import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VideoGame, VideoGameDocument } from './schemas/video-game.schema';
import { Model } from 'mongoose';
import { CreateUpdateVideoGameDto } from './dto/create-update-video-game.dto';

@Injectable()
export class VideoGamesService {
  constructor(
    @InjectModel(VideoGame.name)
    private videoGameModel: Model<VideoGameDocument>,
  ) {}

  async create(
    createVideoGameDto: CreateUpdateVideoGameDto,
  ): Promise<VideoGame> {
    const createdVideoGame = new this.videoGameModel(createVideoGameDto);
    return createdVideoGame.save();
  }

  async findAll(): Promise<VideoGame[]> {
    return this.videoGameModel.find().exec();
  }

  async findOne(id: string): Promise<VideoGame> {
    return this.videoGameModel.findOne({ _id: id }).exec();
  }

  async update(
    id: string,
    updateVideoGameDto: CreateUpdateVideoGameDto,
  ): Promise<VideoGame> {
    const videoGame = await this.videoGameModel.findById(id);
    if (!videoGame) {
      throw new NotFoundException();
    }

    if (videoGame.user.toString() !== updateVideoGameDto.userId) {
      throw new UnauthorizedException();
    }

    videoGame.title = updateVideoGameDto.title;
    videoGame.description = updateVideoGameDto.description;
    videoGame.imageUrl = updateVideoGameDto.imageUrl;
    return videoGame.save();
  }

  async delete(id: string) {
    return await this.videoGameModel.findByIdAndRemove({ _id: id }).exec();
  }
}
