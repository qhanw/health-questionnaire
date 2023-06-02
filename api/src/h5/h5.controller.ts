import { Controller, Get, Post } from '@nestjs/common';

@Controller('h5')
export class H5Controller {
  @Get('get_code')
  getCode(): string {
    return 'This action returns all catsddddee';
  }

  @Post('add')
  create(): string {
    console.log('3');
    return 'add';
  }

  @Post('validate')
  validate(): string {
    return 'validate';
  }
}
