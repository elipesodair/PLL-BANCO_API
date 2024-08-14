"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)()); // Adiciona segurança básica para os cabeçalhos HTTP
// Rate limiting middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita cada IP a 100 requisições por janela
});
app.use(limiter);
// Log de requisições para debugging
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`, req.body);
    next();
});
// Inicializa o banco de dados
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected!");
    // Rotas
    app.use("/auth", authRoutes_1.default);
    app.use("/account", accountRoutes_1.default);
    app.use("/transaction", transactionRoutes_1.default);
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    // Middleware para tratamento de erros
    app.use((err, req, res, next) => {
        console.error("Global Error:", err);
        res.status(500).json({ message: err.message || "Internal Server Error" });
    });
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error during Data Source initialization:", error);
});
