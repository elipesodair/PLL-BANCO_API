"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
require("reflect-metadata");
const app = (0, express_1.default)();
const PORT = 4000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected!");
    app.use(authRoutes_1.default);
    app.use("/account", accountRoutes_1.default);
    app.use("/transaction", transactionRoutes_1.default);
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error during Data Source initialization:", error);
});
