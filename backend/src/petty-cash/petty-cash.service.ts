import { Injectable } from '@nestjs/common';

export interface Voucher {
  id: number;
  voucherNo: string;
  date: string;
  purpose: string;
  amount: number;
  requestedBy: string;
  status: string;
}

@Injectable()
export class PettyCashService {
  private fundBalance = 1000;
  private vouchers: Voucher[] = [];
  private nextId = 1;

  findAll(): Voucher[] {
    return this.vouchers;
  }

  getFundBalance(): number {
    return this.fundBalance;
  }

  create(data: Omit<Voucher, 'id' | 'voucherNo' | 'status'>): Voucher {
    const id = this.nextId++;
    const voucherNo = `PC-${477 + id}`;
    const voucher: Voucher = { id, voucherNo, status: 'Pending', ...data };
    this.vouchers.push(voucher);
    return voucher;
  }

  updateStatus(id: number, status: string): Voucher | undefined {
    const voucher = this.vouchers.find((v) => v.id === id);
    if (voucher) voucher.status = status;
    return voucher;
  }

  replenish(amount: number): number {
    this.fundBalance += amount;
    return this.fundBalance;
  }
}