export declare class SettingsService {
    private settings;
    get(): {
        businessName: string;
        currency: string;
        taxRate: number;
    };
    update(data: Partial<typeof this.settings>): {
        businessName: string;
        currency: string;
        taxRate: number;
    };
}
