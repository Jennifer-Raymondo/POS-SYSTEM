import { BookshopService } from '../bookshop/bookshop.service';
export interface Sale {
    id: number;
    items: {
        bookId: number;
        quantity: number;
        price: number;
    }[];
    total: number;
    createdAt: Date;
}
export declare class PosService {
    private bookshopService;
    private sales;
    private nextId;
    constructor(bookshopService: BookshopService);
    checkout(items: {
        bookId: number;
        quantity: number;
    }[]): Sale;
    findAll(): Sale[];
}
