import { Injectable } from '@nestjs/common';

export interface Order {
  id: number;
  clientId: number;
  items: { bookId: number; quantity: number }[];
  status: string;
  createdAt: Date;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private nextId = 1;

  create(clientId: number, items: { bookId: number; quantity: number }[]): Order {
    const order = { id: this.nextId++, clientId, items, status: 'pending', createdAt: new Date() };
    this.orders.push(order);
    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }

 updateStatus(id: number, status: string): Order | undefined {
  const order = this.orders.find((o) => o.id === id);

  if (order) {
    order.status = status;
  }

  return order;
}
}