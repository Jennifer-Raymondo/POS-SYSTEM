import { Module } from '@nestjs/common';
import { PosService } from './pos.service';
import { PosController } from './pos.controller';
import { BookshopModule } from '../bookshop/bookshop.module';

@Module({
  imports: [BookshopModule],
  controllers: [PosController],
  providers: [PosService],
})
export class PosModule {}