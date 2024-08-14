"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Account_1 = __importDefault(require("./models/Account"));
const Transaction_1 = __importDefault(require("./models/Transaction"));
const isProduction = process.env.NODE_ENV === "production";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: !isProduction,
    entities: isProduction ? ["dist/models/**/*.js"] : [Account_1.default, Transaction_1.default],
    migrations: isProduction
        ? ["dist/migration/**/*.js"]
        : ["src/migration/**/*.ts"],
    subscribers: isProduction
        ? ["dist/subscriber/**/*.js"]
        : ["src/subscriber/**/*.ts"],
});
