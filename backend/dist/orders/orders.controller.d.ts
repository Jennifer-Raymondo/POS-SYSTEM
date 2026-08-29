import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(body: {
        clientId: number;
        items: {
            bookId: number;
            quantity: number;
        }[];
    }): import("./orders.service").Order;
    findAll(): import("./orders.service").Order[];
    updateStatus(id: string, body: {
        status: string;
    }): import("./orders.service").Order | undefined;
}
