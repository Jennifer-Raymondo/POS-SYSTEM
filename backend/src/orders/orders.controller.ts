import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: { clientId: number; items: { bookId: number; quantity: number }[] }) {
    return this.ordersService.create(body.clientId, body.items);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.ordersService.updateStatus(+id, body.status);
  }
}