import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./data-source";
import accountRoutes from "./routes/accountRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import authRoutes from "./routes/authRoutes";
import "reflect-metadata";

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");

    app.use(authRoutes);
    app.use("/account", accountRoutes);
    app.use("/transaction", transactionRoutes);

    app.get("/", (req: express.Request, res: express.Response) => {
      res.send("Hello World!");
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
