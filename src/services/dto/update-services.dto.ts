import { CreateServicesDto } from './create-services.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateServicesDto extends PartialType(CreateServicesDto) {}
