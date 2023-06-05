import { Module } from '@nestjs/common';
import { H5Service } from './h5.service';
import { H5Controller } from './h5.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [H5Controller],
  providers: [H5Service],
  imports: [PrismaModule],
})
export class H5Module {}
