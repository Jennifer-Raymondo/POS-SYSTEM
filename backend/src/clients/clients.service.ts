import { Injectable } from '@nestjs/common';

export interface Client {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  type?: string;
}

@Injectable()
export class ClientsService {
  private clients: Client[] = [];
  private nextId = 1;

  register(data: Omit<Client, 'id'>): Client {
    const client = { id: this.nextId++, ...data };
    this.clients.push(client);
    return client;
  }

  login(email: string, password: string): Client | null {
    return this.clients.find((c) => c.email === email && c.password === password) || null;
  }

  findAll(): Client[] {
    return this.clients;
  }

  update(id: number, data: Partial<Client>): Client | undefined {
    const client = this.clients.find((c) => c.id === id);
    if (client) Object.assign(client, data);
    return client;
  }

  remove(id: number): void {
    this.clients = this.clients.filter((c) => c.id !== id);
  }
}