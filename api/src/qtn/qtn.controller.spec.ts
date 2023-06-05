import { Test, TestingModule } from '@nestjs/testing';
import { QtnController } from './qtn.controller';
import { QtnService } from './qtn.service';

describe('QtnController', () => {
  let controller: QtnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QtnController],
      providers: [QtnService],
    }).compile();

    controller = module.get<QtnController>(QtnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
