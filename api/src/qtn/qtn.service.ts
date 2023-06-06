import { Injectable } from '@nestjs/common';
import { CreateQtnDto } from './dto/create-qtn.dto';
import { UpdateQtnDto } from './dto/update-qtn.dto';
import { QueryQtnDto } from './dto/query-qtn.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QtnService {
  constructor(private prisma: PrismaService) {}
  create(createQtnDto: CreateQtnDto) {
    return 'This action adds a new qtn';
  }

  async find(query: QueryQtnDto) {
    const { current, pageSize } = query;
    const skip = +current - 1;
    const take = +pageSize || 10;
    const sss = await this.prisma.qtn.findMany({
      skip: skip < 1 ? 1 : skip,
      take,
      orderBy: { tel: 'asc' },
    });

    return JSON.parse(
      JSON.stringify(
        sss,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      ),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} qtn`;
  }

  update(id: number, updateQtnDto: UpdateQtnDto) {
    return `This action updates a #${id} qtn`;
  }

  remove(id: number) {
    return `This action removes a #${id} qtn`;
  }
}
