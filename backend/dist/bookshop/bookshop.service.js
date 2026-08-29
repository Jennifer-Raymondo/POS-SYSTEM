"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookshopService = void 0;
const common_1 = require("@nestjs/common");
let BookshopService = class BookshopService {
    books = [];
    nextId = 1;
    findAll() {
        return this.books;
    }
    findOne(id) {
        return this.books.find((b) => b.id === id);
    }
    create(data) {
        const book = { id: this.nextId++, ...data };
        this.books.push(book);
        return book;
    }
    update(id, data) {
        const book = this.findOne(id);
        if (book) {
            Object.assign(book, data);
        }
        return book;
    }
    remove(id) {
        this.books = this.books.filter((b) => b.id !== id);
    }
    reduceStock(id, quantity) {
        const book = this.findOne(id);
        if (book) {
            book.stock -= quantity;
        }
    }
};
exports.BookshopService = BookshopService;
exports.BookshopService = BookshopService = __decorate([
    (0, common_1.Injectable)()
], BookshopService);
//# sourceMappingURL=bookshop.service.js.map