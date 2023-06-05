import { Test, TestingModule } from '@nestjs/testing';
import { H5Service } from './h5.service';

describe('H5Service', () => {
  let service: H5Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [H5Service],
    }).compile();

    service = module.get<H5Service>(H5Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
