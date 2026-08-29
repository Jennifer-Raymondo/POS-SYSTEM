import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    get(): {
        businessName: string;
        currency: string;
        taxRate: number;
    };
    update(body: any): {
        businessName: string;
        currency: string;
        taxRate: number;
    };
}
