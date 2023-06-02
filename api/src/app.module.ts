import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { H5Controller } from './h5/h5.controller';

@Module({
  imports: [],
  controllers: [AppController, H5Controller],
  providers: [AppService],
})
export class AppModule {}
