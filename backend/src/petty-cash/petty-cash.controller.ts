import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PettyCashService } from './petty-cash.service';

@Controller('petty-cash')
export class PettyCashController {
  constructor(private readonly pettyCashService: PettyCashService) {}

  @Get()
  findAll() {
    return this.pettyCashService.findAll();
  }

  @Get('fund')
  getFund() {
    return { balance: this.pettyCashService.getFundBalance() };
  }

  @Post()
  create(@Body() body: { date: string; purpose: string; amount: number; requestedBy: string }) {
    return this.pettyCashService.create(body);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.pettyCashService.updateStatus(+id, body.status);
  }

  @Post('replenish')
  replenish(@Body() body: { amount: number }) {
    return { balance: this.pettyCashService.replenish(body.amount) };
  }
}