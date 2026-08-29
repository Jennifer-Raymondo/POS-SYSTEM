import { Body, Controller, Get, Post } from '@nestjs/common';
import { PosService } from './pos.service';

@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Post('checkout')
  checkout(@Body() body: { items: { bookId: number; quantity: number }[] }) {
    return this.posService.checkout(body.items);
  }

  @Get('sales')
  findAll() {
    return this.posService.findAll();
  }
}