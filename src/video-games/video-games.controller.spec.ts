import { Test, TestingModule } from '@nestjs/testing';
import { VideoGamesController } from './video-games.controller';

describe('VideoGamesController', () => {
  let controller: VideoGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoGamesController],
    }).compile();

    controller = module.get<VideoGamesController>(VideoGamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
