import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HrService } from './hr.service';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get()
  findAll() {
    return this.hrService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.hrService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.hrService.remove(+id);
    return { deleted: true };
  }
}