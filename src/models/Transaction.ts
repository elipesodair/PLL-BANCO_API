import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Account from "./Account";

@Entity()
class Transaction {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  type!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  account!: Account;
}

export default Transaction;
