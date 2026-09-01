import { Injectable } from '@nestjs/common';

export interface Purchase {
  id: number;
  poNumber: string;
  supplier: string;
  date: string;
  items: number;
  value: number;
  status: string;
}

@Injectable()
export class PurchasesService {
  private purchases: Purchase[] = [];
  private nextId = 1;

  findAll(): Purchase[] {
    return this.purchases;
  }

  create(data: Omit<Purchase, 'id' | 'poNumber' | 'status'>): Purchase {
    const id = this.nextId++;
    const poNumber = `PO-${181 + id}`;
    const purchase: Purchase = { id, poNumber, status: 'Pending', ...data };
    this.purchases.push(purchase);
    return purchase;
  }

  updateStatus(id: number, status: string): Purchase | undefined {
    const purchase = this.purchases.find((p) => p.id === id);
    if (purchase) purchase.status = status;
    return purchase;
  }
}