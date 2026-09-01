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
export declare class HrService {
    private staff;
    private nextId;
    findAll(): Staff[];
    create(data: Omit<Staff, 'id'>): Staff;
    update(id: number, data: Partial<Staff>): Staff | undefined;
    remove(id: number): void;
}
