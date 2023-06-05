import { PartialType } from '@nestjs/swagger';
import { CreateQtnDto } from './create-qtn.dto';

export class UpdateQtnDto extends PartialType(CreateQtnDto) {}
