export interface Staff {
    id: number;
    name: string;
    role: string;
    phone: string;
}
export declare class HrService {
    private staff;
    private nextId;
    findAll(): Staff[];
    create(data: Omit<Staff, 'id'>): Staff;
    remove(id: number): void;
}
