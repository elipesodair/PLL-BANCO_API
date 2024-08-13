import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  accountNumber?: string;

  @Column()
  balance?: number;

  @Column()
  ownerName?: string;

  @OneToMany(() => Transaction, transaction => transaction.account)
  transactions?: Transaction[];
}
