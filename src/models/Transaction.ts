import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Account from "./Account";

// Define a entidade Transaction para o banco de dados
@Entity()
class Transaction {
  // Coluna que é a chave primária, gerada automaticamente
  @PrimaryGeneratedColumn()
  id?: number;

  // Coluna para o tipo de transação (ex: depósito, saque)
  @Column()
  type!: string;

  // Coluna para o valor da transação, com precisão e escala definidas
  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  // Relacionamento muitos-para-um com a entidade Account
  @ManyToOne(() => Account, (account) => account.transactions)
  account!: Account;
}

export default Transaction;
