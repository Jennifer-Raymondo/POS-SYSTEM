"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosService = void 0;
const common_1 = require("@nestjs/common");
const bookshop_service_1 = require("../bookshop/bookshop.service");
let PosService = class PosService {
    bookshopService;
    sales = [];
    nextId = 1;
    constructor(bookshopService) {
        this.bookshopService = bookshopService;
    }
    checkout(items) {
        let total = 0;
        const saleItems = items.map((item) => {
            const book = this.bookshopService.findOne(item.bookId);
            const price = book ? book.price : 0;
            total += price * item.quantity;
            this.bookshopService.reduceStock(item.bookId, item.quantity);
            return { bookId: item.bookId, quantity: item.quantity, price };
        });
        const sale = {
            id: this.nextId++,
            items: saleItems,
            total,
            createdAt: new Date(),
        };
        this.sales.push(sale);
        return sale;
    }
    findAll() {
        return this.sales;
    }
};
exports.PosService = PosService;
exports.PosService = PosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bookshop_service_1.BookshopService])
], PosService);
//# sourceMappingURL=pos.service.js.map