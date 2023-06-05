import { ApiProperty } from '@nestjs/swagger';

export class CreateQtnDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
}
