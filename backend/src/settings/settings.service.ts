import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  private settings = {
    businessName: 'My Bookshop',
    currency: 'UGX',
    taxRate: 0,
  };

  get() {
    return this.settings;
  }

  update(data: Partial<typeof this.settings>) {
    Object.assign(this.settings, data);
    return this.settings;
  }
}