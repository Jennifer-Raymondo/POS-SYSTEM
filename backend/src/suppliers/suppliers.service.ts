import { Injectable } from '@nestjs/common';

export interface Supplier {
  id: number;
  name: string;
  contact: string;
  terms: string;
  balance: number;
  lastPurchase: string;
  rating: string;
}

@Injectable()
export class SuppliersService {
  private suppliers: Supplier[] = [];
  private nextId = 1;

  findAll(): Supplier[] {
    return this.suppliers;
  }

  create(data: Omit<Supplier, 'id'>): Supplier {
    const supplier = { id: this.nextId++, ...data };
    this.suppliers.push(supplier);
    return supplier;
  }

  update(id: number, data: Partial<Supplier>): Supplier | undefined {
    const supplier = this.suppliers.find((s) => s.id === id);
    if (supplier) Object.assign(supplier, data);
    return supplier;
  }

  remove(id: number): void {
    this.suppliers = this.suppliers.filter((s) => s.id !== id);
  }
}