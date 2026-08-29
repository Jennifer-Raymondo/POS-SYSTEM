"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
let AccountsService = class AccountsService {
    transactions = [];
    nextId = 1;
    add(type, amount, note) {
        const transaction = { id: this.nextId++, type, amount, note, createdAt: new Date() };
        this.transactions.push(transaction);
        return transaction;
    }
    findAll() {
        return this.transactions;
    }
    summary() {
        const income = this.transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = this.transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return { income, expense, profit: income - expense };
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)()
], AccountsService);
//# sourceMappingURL=accounts.service.js.map