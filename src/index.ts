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

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 requisições por janela
});
app.use(limiter);

// Inicializa o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");

    // Rotas
    app.use("/account", accountRoutes); 
    app.use("/transaction", transactionRoutes);
    app.use("/auth", authRoutes);

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    // Middleware para tratamento de erros
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error("Global Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
