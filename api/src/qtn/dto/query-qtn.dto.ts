import { ApiProperty } from '@nestjs/swagger';
export class QueryQtnDto {
  @ApiProperty()
  current: number;
  @ApiProperty()
  pageSize: number;
}
