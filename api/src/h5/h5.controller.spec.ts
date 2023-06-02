import { Test, TestingModule } from '@nestjs/testing';
import { H5Controller } from './h5.controller';

describe('H5Controller', () => {
  let controller: H5Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [H5Controller],
    }).compile();

    controller = module.get<H5Controller>(H5Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
