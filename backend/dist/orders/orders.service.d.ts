export interface Order {
    id: number;
    clientId: number;
    items: {
        bookId: number;
        quantity: number;
    }[];
    status: string;
    createdAt: Date;
}
export declare class OrdersService {
    private orders;
    private nextId;
    create(clientId: number, items: {
        bookId: number;
        quantity: number;
    }[]): Order;
    findAll(): Order[];
    updateStatus(id: number, status: string): Order | undefined;
}
