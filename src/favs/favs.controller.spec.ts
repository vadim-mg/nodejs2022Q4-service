import { Test, TestingModule } from '@nestjs/testing';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

describe('FavsController', () => {
  let controller: FavsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavsController],
      providers: [FavsService],
    }).compile();

    controller = module.get<FavsController>(FavsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
