import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookshopService } from './bookshop.service';

@Controller('bookshop')
export class BookshopController {
  constructor(private readonly bookshopService: BookshopService) {}

  @Get()
  findAll() {
    return this.bookshopService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.bookshopService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.bookshopService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.bookshopService.remove(+id);
    return { deleted: true };
  }
}