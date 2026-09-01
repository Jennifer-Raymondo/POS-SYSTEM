import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  branch: string;
  status: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [
    { id: 1, username: 'admin', password: 'admin123', role: 'Super Admin', branch: 'HQ', status: 'Active' },
    { id: 2, username: 'cashier', password: 'cashier123', role: 'Cashier', branch: 'Main Store', status: 'Active' },
  ];
  private nextId = 3;

  login(username: string, password: string) {
    const user = this.users.find((u) => u.username === username && u.password === password);
    if (!user) return null;
    return { username: user.username, role: user.role };
  }

  findAll(): User[] {
    return this.users;
  }

  create(data: Omit<User, 'id'>): User {
    const user = { id: this.nextId++, ...data };
    this.users.push(user);
    return user;
  }

  update(id: number, data: Partial<User>): User | undefined {
    const user = this.users.find((u) => u.id === id);
    if (user) Object.assign(user, data);
    return user;
  }

  remove(id: number): void {
    this.users = this.users.filter((u) => u.id !== id);
  }
}