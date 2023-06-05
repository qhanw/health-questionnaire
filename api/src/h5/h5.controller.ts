import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

import { H5Service } from './h5.service';
import { CreateQtnDto } from './dto/create-qtn.dto';
import { FindAllDto } from './dto/find-all.dto';

@Controller('h5')
export class H5Controller {
  constructor(private readonly h5Service: H5Service) {}

  @Get('get_code')
  getCode(): string {
    return 'This action returns all catsddddee';
  }

  @Post('add')
  create(@Body() qtn: CreateQtnDto): string {
    return this.h5Service.create(qtn);
  }

  @Post('validate')
  validate(): string {
    return 'validate';
  }

  @Get('find_all')
  findAll(@Query() params: FindAllDto) {
    return this.h5Service.findAll(params);
  }
}
