import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  list() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.contactsService.delete(+id);
  }
}
