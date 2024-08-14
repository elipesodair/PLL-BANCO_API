import { Router } from "express";
import { AppDataSource } from "../data-source";
import Transaction from "../models/Transaction";
import Account from "../models/Account";

const router = Router();

// Endpoint para criar uma nova transação
router.post("/", async (req, res) => {
  const { accountNumber, type, amount } = req.body;

  try {
    const accountRepository = AppDataSource.getRepository(Account);
    const account = await accountRepository.findOneBy({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Conta não encontrada" });
    }

    const transactionRepository = AppDataSource.getRepository(Transaction);
    const newTransaction = transactionRepository.create({
      type,
      amount,
      account, // Associa a transação à conta encontrada
    });

    await transactionRepository.save(newTransaction);

    // Atualiza o saldo da conta
    if (type === "deposit") {
      account.balance += amount;
    } else if (type === "withdraw" && account.balance >= amount) {
      account.balance -= amount;
    } else if (type === "withdraw" && account.balance < amount) {
      return res.status(400).json({ message: "Saldo insuficiente" });
    }

    await accountRepository.save(account);

    res.status(201).json({ message: "Transação criada com sucesso", data: newTransaction });
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    res.status(500).json({ message: "Erro ao criar transação" });
  }
});

export default router;
