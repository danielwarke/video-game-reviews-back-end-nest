import { Body, Controller, Post } from '@nestjs/common';
import { CreateVideoGameDto } from './dto/create-video-game.dto';

@Controller('video-games')
export class VideoGamesController {
  @Post()
  create(@Body() createVideoGameDto: CreateVideoGameDto) {}
}
