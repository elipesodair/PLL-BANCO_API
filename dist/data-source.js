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
// Cria uma nova instância do DataSource para a conexão com o banco de dados
exports.AppDataSource = new typeorm_1.DataSource({
    // Tipo de banco de dados
    type: "sqlite",
    // Nome do arquivo do banco de dados SQLite
    database: "database.sqlite",
    // Sincroniza automaticamente o schema do banco de dados com as entidades
    synchronize: true,
    // Ativa o logging de SQL se não estiver em produção
    logging: !isProduction,
    // Define quais entidades usar baseadas no ambiente
    entities: isProduction
        ? ["dist/models/**/*.js"] // Usa os arquivos JavaScript compilados em produção
        : [Account_1.default, Transaction_1.default], // Usa as entidades diretamente em desenvolvimento
    // Define quais arquivos de migração usar baseados no ambiente
    migrations: isProduction
        ? ["dist/migration/**/*.js"] // Usa os arquivos JavaScript compilados em produção
        : ["src/migration/**/*.ts"], // Usa os arquivos TypeScript em desenvolvimento
    // Define quais arquivos de subscriber usar baseados no ambiente
    subscribers: isProduction
        ? ["dist/subscriber/**/*.js"] // Usa os arquivos JavaScript compilados em produção
        : ["src/subscriber/**/*.ts"], // Usa os arquivos TypeScript em desenvolvimento
});
