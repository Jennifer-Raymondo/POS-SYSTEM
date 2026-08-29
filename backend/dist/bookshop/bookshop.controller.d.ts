import { BookshopService } from './bookshop.service';
export declare class BookshopController {
    private readonly bookshopService;
    constructor(bookshopService: BookshopService);
    findAll(): import("./bookshop.service").Book[];
    create(body: any): import("./bookshop.service").Book;
    update(id: string, body: any): import("./bookshop.service").Book | undefined;
    remove(id: string): {
        deleted: boolean;
    };
}
