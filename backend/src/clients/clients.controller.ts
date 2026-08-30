import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.clientsService.register(body);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.clientsService.login(body.email, body.password);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.clientsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.clientsService.remove(+id);
    return { deleted: true };
  }
}