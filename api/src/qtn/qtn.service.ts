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
    const curr = +current || 1;
    const take = +pageSize || 10;
    const total = await this.prisma.qtn.count();

    const list = await this.prisma.qtn.findMany({
      skip: ((curr < 1 ? 1 : curr) - 1) * take,
      take,
      orderBy: { tel: 'asc' },
      select: {
        tel: true,
        A1: true,
        A2: true,
        A3: true,
        A4: true,
        A5: true,
        A6: true,
        A7: true,
        A8: true,
        A9: true,
        A10: true,
      },
    });

    return {
      data: {
        pagination: { current: curr, pageSize: take, total },
        list: JSON.parse(
          JSON.stringify(
            list,
            (key, value) =>
              typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
          ),
        ),
      },
    };
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
