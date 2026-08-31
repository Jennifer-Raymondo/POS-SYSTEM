import { Module } from '@nestjs/common';
import { BookshopModule } from './bookshop/bookshop.module';
import { PosModule } from './pos/pos.module';
import { AccountsModule } from './accounts/accounts.module';
import { HrModule } from './hr/hr.module';
import { SettingsModule } from './settings/settings.module';
import { ClientsModule } from './clients/clients.module';
import { OrdersModule } from './orders/orders.module';
import { PettyCashModule } from './petty-cash/petty-cash.module';

@Module({
  imports: [
    BookshopModule,
    PosModule,
    AccountsModule,
    HrModule,
    SettingsModule,
    ClientsModule,
    OrdersModule,
    PettyCashModule
  ],
})
export class AppModule {}