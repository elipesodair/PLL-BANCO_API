"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const data_source_1 = require("./data-source");
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
require("reflect-metadata");
const app = (0, express_1.default)();
const PORT = 4000;
// Configurações de middleware
app.use(body_parser_1.default.json()); // Middleware para parsing de JSON no corpo das requisições
app.use((0, cors_1.default)()); // Middleware para habilitar CORS
app.use((0, helmet_1.default)()); // Middleware para definir cabeçalhos de segurança
// Middleware de rate limiting para proteger contra ataques de força bruta
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita cada IP a 100 requisições por janela de tempo
});
app.use(limiter);
// Inicializa o banco de dados
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected!");
    // Configuração das rotas
    app.use("/account", accountRoutes_1.default); // Rotas para operações de conta
    app.use("/transaction", transactionRoutes_1.default); // Rotas para operações de transação
    app.use(authRoutes_1.default); // Rotas para autenticação
    // Rota principal
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    // Middleware global de tratamento de erros
    app.use((err, req, res, next) => {
        console.error("Global Error:", err); // Loga o erro
        res.status(500).json({ message: "Internal Server Error" }); // Responde com um erro genérico
    });
    // Inicia o servidor
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error during Data Source initialization:", error); // Loga erros de inicialização do banco de dados
});
