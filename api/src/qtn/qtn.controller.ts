import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QtnService } from './qtn.service';
import { CreateQtnDto } from './dto/create-qtn.dto';
import { UpdateQtnDto } from './dto/update-qtn.dto';

@Controller('qtn')
export class QtnController {
  constructor(private readonly qtnService: QtnService) {}

  @Post()
  create(@Body() createQtnDto: CreateQtnDto) {
    return this.qtnService.create(createQtnDto);
  }

  @Get()
  findAll() {
    return this.qtnService.findAll();
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
