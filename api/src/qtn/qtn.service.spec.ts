import { Test, TestingModule } from '@nestjs/testing';
import { QtnService } from './qtn.service';

describe('QtnService', () => {
  let service: QtnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QtnService],
    }).compile();

    service = module.get<QtnService>(QtnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
