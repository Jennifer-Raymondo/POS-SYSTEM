import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    add(body: {
        type: 'income' | 'expense';
        amount: number;
        note: string;
    }): import("./accounts.service").Transaction;
    findAll(): import("./accounts.service").Transaction[];
    summary(): {
        income: number;
        expense: number;
        profit: number;
    };
}
