import { Injectable } from '@nestjs/common';

export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  note: string;
  createdAt: Date;
}

@Injectable()
export class AccountsService {
  private transactions: Transaction[] = [];
  private nextId = 1;

  add(type: 'income' | 'expense', amount: number, note: string): Transaction {
    const transaction = { id: this.nextId++, type, amount, note, createdAt: new Date() };
    this.transactions.push(transaction);
    return transaction;
  }

  findAll(): Transaction[] {
    return this.transactions;
  }

  summary() {
    const income = this.transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = this.transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, profit: income - expense };
  }
}