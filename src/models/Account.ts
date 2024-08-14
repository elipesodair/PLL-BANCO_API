import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Transaction from "./Transaction";

@Entity()
class Account {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  accountNumber!: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  balance!: number;

  @Column()
  ownerName!: string;

  @Column()
  document!: string;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions?: Transaction[];
}

export default Account;
