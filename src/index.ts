import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { AppDataSource } from "./data-source";
import accountRoutes from "./routes/accountRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import authRoutes from "./routes/authRoutes";
import "reflect-metadata";

const app = express();
const PORT = 4000;

// Configurações de middleware
app.use(bodyParser.json()); // Middleware para parsing de JSON no corpo das requisições
app.use(cors()); // Middleware para habilitar CORS
app.use(helmet()); // Middleware para definir cabeçalhos de segurança

// Middleware de rate limiting para proteger contra ataques de força bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 requisições por janela de tempo
});
app.use(limiter);

// Inicializa o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");

    // Configuração das rotas
    app.use("/account", accountRoutes); // Rotas para operações de conta
    app.use("/transaction", transactionRoutes); // Rotas para operações de transação
    app.use(authRoutes); // Rotas para autenticação

    // Rota principal
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    // Middleware global de tratamento de erros
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
