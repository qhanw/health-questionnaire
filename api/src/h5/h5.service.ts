import { Injectable } from '@nestjs/common';

import { CreateQtnDto } from './dto/create-qtn.dto';
import { FindAllDto } from './dto/find-all.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class H5Service {
  constructor(private prisma: PrismaService) {}
  create(qnt: CreateQtnDto) {
    return 'xxxxxx';
  }

  findAll(params: FindAllDto) {
    console.log(params);
    return this.prisma.list.findMany({
      where: { age: { equals: +params.age } },
    });
  }
}
