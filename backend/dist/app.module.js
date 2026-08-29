"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const bookshop_module_1 = require("./bookshop/bookshop.module");
const pos_module_1 = require("./pos/pos.module");
const accounts_module_1 = require("./accounts/accounts.module");
const hr_module_1 = require("./hr/hr.module");
const settings_module_1 = require("./settings/settings.module");
const clients_module_1 = require("./clients/clients.module");
const orders_module_1 = require("./orders/orders.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bookshop_module_1.BookshopModule,
            pos_module_1.PosModule,
            accounts_module_1.AccountsModule,
            hr_module_1.HrModule,
            settings_module_1.SettingsModule,
            clients_module_1.ClientsModule,
            orders_module_1.OrdersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map