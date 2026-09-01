import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  findAll() {
    return this.purchasesService.findAll();
  }

  @Post()
  create(@Body() body: { supplier: string; date: string; items: number; value: number }) {
    return this.purchasesService.create(body);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.purchasesService.updateStatus(+id, body.status);
  }
}