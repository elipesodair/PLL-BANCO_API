import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Transaction from "./Transaction";

// Define a entidade Account para o banco de dados
@Entity()
class Account {
  // Coluna que é a chave primária, gerada automaticamente
  @PrimaryGeneratedColumn()
  id?: number;

  // Coluna para o número da conta, deve ser único
  @Column({ unique: true })
  accountNumber!: string;

  // Coluna para o saldo da conta, com precisão e escala definidas
  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  balance!: number;

  // Coluna para o nome do proprietário da conta
  @Column()
  ownerName!: string;

  // Coluna para o documento do proprietário (ex: CPF, RG)
  @Column()
  document!: string;

  // Relacionamento um-para-muitos com a entidade Transaction
  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions?: Transaction[];
}

export default Account;

