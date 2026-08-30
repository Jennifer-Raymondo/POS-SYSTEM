export interface Client {
    id: number;
    name: string;
    email: string;
    password: string;
    phone?: string;
    type?: string;
}
export declare class ClientsService {
    private clients;
    private nextId;
    register(data: Omit<Client, 'id'>): Client;
    login(email: string, password: string): Client | null;
    findAll(): Client[];
    update(id: number, data: Partial<Client>): Client | undefined;
    remove(id: number): void;
}
