import { Module } from '@nestjs/common';
import { QtnService } from './qtn.service';
import { QtnController } from './qtn.controller';

@Module({
  controllers: [QtnController],
  providers: [QtnService]
})
export class QtnModule {}
