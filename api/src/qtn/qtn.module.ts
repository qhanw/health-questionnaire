import { Module } from '@nestjs/common';
import { QtnService } from './qtn.service';
import { QtnController } from './qtn.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [QtnController],
  providers: [QtnService],
  imports: [PrismaModule],
})
export class QtnModule {}
