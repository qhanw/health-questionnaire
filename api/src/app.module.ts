import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { H5Module } from './h5/h5.module';
import { QtnModule } from './qtn/qtn.module';

@Module({
  imports: [PrismaModule, H5Module, QtnModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
