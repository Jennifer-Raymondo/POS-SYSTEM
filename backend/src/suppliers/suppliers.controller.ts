import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.suppliersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.suppliersService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.suppliersService.remove(+id);
    return { deleted: true };
  }
}