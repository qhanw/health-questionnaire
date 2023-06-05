import { ApiProperty } from '@nestjs/swagger';

export class FindAllDto {
  @ApiProperty()
  age: number;
}
