import { ClientsService } from './clients.service';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    register(body: any): import("./clients.service").Client;
    login(body: {
        email: string;
        password: string;
    }): import("./clients.service").Client | null;
    findAll(): import("./clients.service").Client[];
    update(id: string, body: any): import("./clients.service").Client | undefined;
    remove(id: string): {
        deleted: boolean;
    };
}
