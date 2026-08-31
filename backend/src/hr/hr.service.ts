import { Injectable } from '@nestjs/common';

export interface Staff {
  id: number;
  name: string;
  department: string;
  role: string;
  phone: string;
  attendance: string;
  leaveDays: number;
  status: string;
}

@Injectable()
export class HrService {
  private staff: Staff[] = [];
  private nextId = 1;

  findAll(): Staff[] {
    return this.staff;
  }

  create(data: Omit<Staff, 'id'>): Staff {
    const member = { id: this.nextId++, ...data };
    this.staff.push(member);
    return member;
  }

  update(id: number, data: Partial<Staff>): Staff | undefined {
    const member = this.staff.find((s) => s.id === id);
    if (member) Object.assign(member, data);
    return member;
  }

  remove(id: number): void {
    this.staff = this.staff.filter((s) => s.id !== id);
  }
}