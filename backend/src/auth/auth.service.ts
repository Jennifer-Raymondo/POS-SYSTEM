import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'cashier', password: 'cashier123', role: 'cashier' },
  ];

  login(username: string, password: string) {
    const user = this.users.find((u) => u.username === username && u.password === password);
    if (!user) return null;
    return { username: user.username, role: user.role };
  }
}