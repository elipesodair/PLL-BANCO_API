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
    const transactionRepository = AppDataSource.getRepository(Transaction);

    // Encontre a conta pelo número fornecido
    const account = await accountRepository.findOneBy({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Conta não encontrada" });
    }

    // Atualiza o saldo da conta baseado no tipo de transação
    if (type === "deposit") {
      account.balance += amount;
    } else if (type === "withdraw") {
      if (account.balance < amount) {
        return res
          .status(400)
          .json({ message: "Saldo insuficiente para saque" });
      }
      account.balance -= amount;
    } else {
      return res.status(400).json({ message: "Tipo de transação inválido" });
    }

    // Cria uma nova transação com os dados fornecidos
    const newTransaction = transactionRepository.create({
      type,
      amount,
      account,
    });

    // Salva a nova transação e a conta atualizada no banco de dados
    await transactionRepository.save(newTransaction);
    await accountRepository.save(account);

    // Retorna uma resposta de sucesso
    res
      .status(201)
      .json({ message: "Transação criada com sucesso", data: newTransaction });
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    res.status(500).json({ message: "Erro ao criar transação" });
  }
});

// Endpoint para obter uma transação pelo ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const transaction = await transactionRepository.findOneBy({
      id: parseInt(id),
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    res.status(200).json({ data: transaction });
  } catch (error) {
    console.error("Erro ao obter transação:", error);
    res.status(500).json({ message: "Erro ao obter transação" });
  }
});

export default router;
