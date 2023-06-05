import { Injectable } from '@nestjs/common';
import { CreateQtnDto } from './dto/create-qtn.dto';
import { UpdateQtnDto } from './dto/update-qtn.dto';

@Injectable()
export class QtnService {
  create(createQtnDto: CreateQtnDto) {
    return 'This action adds a new qtn';
  }

  findAll() {
    return `This action returns all qtn`;
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
