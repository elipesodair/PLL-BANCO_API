// src/models/Transaction.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number; // Use "!" para indicar que o TypeScript deve ignorar a inicialização

  @Column()
  type: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  constructor(type: string, amount: number, date: Date, account: Account) {
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.account = account;
  }
}
