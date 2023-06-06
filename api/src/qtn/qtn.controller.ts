import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QtnService } from './qtn.service';
import { CreateQtnDto } from './dto/create-qtn.dto';
import { UpdateQtnDto } from './dto/update-qtn.dto';
import { QueryQtnDto } from './dto/query-qtn.dto';

@Controller('qtn')
export class QtnController {
  constructor(private readonly qtnService: QtnService) {}

  @Post()
  create(@Body() createQtnDto: CreateQtnDto) {
    return this.qtnService.create(createQtnDto);
  }

  @Get()
  findAll(@Query() query: QueryQtnDto) {
    const lis = this.qtnService.find(query);
    console.log(lis);
    return lis;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qtnService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQtnDto: UpdateQtnDto) {
    return this.qtnService.update(+id, updateQtnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qtnService.remove(+id);
  }
}
