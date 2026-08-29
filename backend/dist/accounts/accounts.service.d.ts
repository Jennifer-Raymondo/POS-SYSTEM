export interface Transaction {
    id: number;
    type: 'income' | 'expense';
    amount: number;
    note: string;
    createdAt: Date;
}
export declare class AccountsService {
    private transactions;
    private nextId;
    add(type: 'income' | 'expense', amount: number, note: string): Transaction;
    findAll(): Transaction[];
    summary(): {
        income: number;
        expense: number;
        profit: number;
    };
}
