import { DataSource } from "typeorm";
import Account from "./models/Account";
import Transaction from "./models/Transaction";

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: !isProduction,
  entities: isProduction ? ["dist/models/**/*.js"] : [Account, Transaction],
  migrations: isProduction
    ? ["dist/migration/**/*.js"]
    : ["src/migration/**/*.ts"],
  subscribers: isProduction
    ? ["dist/subscriber/**/*.js"]
    : ["src/subscriber/**/*.ts"],
});
