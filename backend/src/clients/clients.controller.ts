import { Body, Controller, Get, Post } from '@nestjs/common';
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
}