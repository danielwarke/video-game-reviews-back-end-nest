import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUpdateVideoGameDto } from './dto/create-update-video-game.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VideoGamesService } from './video-games.service';
import { VideoGame } from './schemas/video-game.schema';

@Controller('video-games')
export class VideoGamesController {
  constructor(private videoGamesService: VideoGamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createVideoGameDto: CreateUpdateVideoGameDto,
    @Request() req,
  ) {
    createVideoGameDto.userId = req.user.id;
    await this.videoGamesService.create(createVideoGameDto);
  }

  @Get()
  findAll(): Promise<VideoGame[]> {
    return this.videoGamesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VideoGame> {
    return this.videoGamesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVideoGameDto: CreateUpdateVideoGameDto,
    @Request() req,
  ) {
    updateVideoGameDto.userId = req.user.id;
    return this.videoGamesService.update(id, updateVideoGameDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.videoGamesService.delete(id);
  }
}
