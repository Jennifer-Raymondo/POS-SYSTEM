import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WholesaleService } from './wholesale.service';

@Controller('wholesale')
export class WholesaleController {
  constructor(private readonly wholesaleService: WholesaleService) {}

  @Get()
  findAll() {
    return this.wholesaleService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.wholesaleService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.wholesaleService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.wholesaleService.remove(+id);
    return { deleted: true };
  }
}
