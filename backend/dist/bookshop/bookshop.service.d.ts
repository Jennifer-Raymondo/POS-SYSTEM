export interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    stock: number;
    category: string;
}
export declare class BookshopService {
    private books;
    private nextId;
    findAll(): Book[];
    findOne(id: number): Book | undefined;
    create(data: Omit<Book, 'id'>): Book;
    update(id: number, data: Partial<Book>): Book | undefined;
    remove(id: number): void;
    reduceStock(id: number, quantity: number): void;
}
