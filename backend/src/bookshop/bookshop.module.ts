import { Module } from '@nestjs/common';
import { BookshopService } from './bookshop.service';
import { BookshopController } from './bookshop.controller';

@Module({
  controllers: [BookshopController],
  providers: [BookshopService],
  exports: [BookshopService],
})
export class BookshopModule {}