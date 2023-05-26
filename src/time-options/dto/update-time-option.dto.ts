import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeOptionDto } from './create-time-option.dto';

export class UpdateTimeOptionDto extends PartialType(CreateTimeOptionDto) {}
