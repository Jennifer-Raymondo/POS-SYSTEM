import { Injectable } from '@nestjs/common';
import { BookshopService } from '../bookshop/bookshop.service';

export interface Sale {
  id: number;
  items: { bookId: number; quantity: number; price: number }[];
  total: number;
  createdAt: Date;
}

@Injectable()
export class PosService {
  private sales: Sale[] = [];
  private nextId = 1;

  constructor(private bookshopService: BookshopService) {}

  checkout(items: { bookId: number; quantity: number }[]): Sale {
    let total = 0;
    const saleItems = items.map((item) => {
      const book = this.bookshopService.findOne(item.bookId);
      const price = book ? book.price : 0;
      total += price * item.quantity;
      this.bookshopService.reduceStock(item.bookId, item.quantity);
      return { bookId: item.bookId, quantity: item.quantity, price };
    });

    const sale: Sale = {
      id: this.nextId++,
      items: saleItems,
      total,
      createdAt: new Date(),
    };
    this.sales.push(sale);
    return sale;
  }

  findAll(): Sale[] {
    return this.sales;
  }
}