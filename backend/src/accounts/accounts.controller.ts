import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  add(@Body() body: { type: 'income' | 'expense'; amount: number; note: string }) {
    return this.accountsService.add(body.type, body.amount, body.note);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get('summary')
  summary() {
    return this.accountsService.summary();
  }
}