import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Get()
  findAll() {
    return this.deliveriesService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.deliveriesService.create(body);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string; proof?: string }) {
    return this.deliveriesService.updateStatus(+id, body.status, body.proof);
  }
}