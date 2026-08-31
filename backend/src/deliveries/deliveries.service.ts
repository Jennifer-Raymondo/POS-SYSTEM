import { Injectable } from '@nestjs/common';

export interface Delivery {
  id: number;
  deliveryNo: string;
  customer: string;
  driver: string;
  eta: string;
  status: string;
  proof: string;
}

@Injectable()
export class DeliveriesService {
  private deliveries: Delivery[] = [];
  private nextId = 1;

  findAll(): Delivery[] {
    return this.deliveries;
  }

  create(data: Omit<Delivery, 'id' | 'deliveryNo'>): Delivery {
    const id = this.nextId++;
    const deliveryNo = `DL-${838 + id}`;
    const delivery: Delivery = { id, deliveryNo, ...data };
    this.deliveries.push(delivery);
    return delivery;
  }

  updateStatus(id: number, status: string, proof?: string): Delivery | undefined {
    const delivery = this.deliveries.find((d) => d.id === id);
    if (delivery) {
      delivery.status = status;
      if (proof) delivery.proof = proof;
    }
    return delivery;
  }
}