// src/routes/transactionRoutes.ts
import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Transaction } from "../models/Transaction";
import { Account } from "../models/Account";

const router = Router();

// Endpoint para criar uma nova transação
router.post("/transaction", async (req, res) => {
  const { type, amount, date, accountId } = req.body;

  try {
    const accountRepository = AppDataSource.getRepository(Account);
    const account = await accountRepository.findOneBy({ id: accountId });

    if (!account) {
      return res.status(404).json({ error: "Conta não encontrada" });
    }

    const transaction = new Transaction(type, amount, new Date(date), account); // Corrigido para incluir 'type'
    const transactionRepository = AppDataSource.getRepository(Transaction);
    await transactionRepository.save(transaction);

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    res.status(500).json({ error: "Erro ao criar transação" });
  }
});

export default router;
