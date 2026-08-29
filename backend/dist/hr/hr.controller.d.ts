import { HrService } from './hr.service';
export declare class HrController {
    private readonly hrService;
    constructor(hrService: HrService);
    findAll(): import("./hr.service").Staff[];
    create(body: any): import("./hr.service").Staff;
    remove(id: string): {
        deleted: boolean;
    };
}
