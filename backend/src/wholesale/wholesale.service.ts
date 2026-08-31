import { Injectable } from '@nestjs/common';

export interface WholesaleOrder {
  id: number;
  orderNo: string;
  customer: string;
  value: number;
  stage: string;
  rep: string;
  createdAt: string;
}

@Injectable()
export class WholesaleService {
  private orders: WholesaleOrder[] = [];
  private nextId = 1;

  findAll(): WholesaleOrder[] {
    return this.orders;
  }

  create(data: Omit<WholesaleOrder, 'id' | 'orderNo' | 'createdAt'>): WholesaleOrder {
    const id = this.nextId++;
    const orderNo = `SO-${20478 + id}`;
    const order: WholesaleOrder = { id, orderNo, createdAt: new Date().toISOString(), ...data };
    this.orders.push(order);
    return order;
  }

  update(id: number, data: Partial<WholesaleOrder>): WholesaleOrder | undefined {
    const order = this.orders.find((o) => o.id === id);
    if (order) Object.assign(order, data);
    return order;
  }

  remove(id: number): void {
    this.orders = this.orders.filter((o) => o.id !== id);
  }
}