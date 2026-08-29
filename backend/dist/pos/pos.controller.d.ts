import { PosService } from './pos.service';
export declare class PosController {
    private readonly posService;
    constructor(posService: PosService);
    checkout(body: {
        items: {
            bookId: number;
            quantity: number;
        }[];
    }): import("./pos.service").Sale;
    findAll(): import("./pos.service").Sale[];
}
