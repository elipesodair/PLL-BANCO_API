import { Router } from "express";
import { AppDataSource } from "../data-source";
import Transaction from "../models/Transaction";
import Account from "../models/Account";

const router = Router();

// Endpoint para criar uma nova transação
router.post("/", async (req, res) => {
  // Desestrutura os dados da solicitação
  const { accountNumber, type, amount } = req.body;

  try {
    // Obtém o repositório de contas
    const accountRepository = AppDataSource.getRepository(Account);
    // Busca a conta pelo número fornecido
    const account = await accountRepository.findOneBy({ accountNumber });

    // Verifica se a conta foi encontrada
    if (!account) {
      return res.status(404).json({ message: "Conta não encontrada" });
    }

    // Obtém o repositório de transações
    const transactionRepository = AppDataSource.getRepository(Transaction);
    // Cria uma nova transação com os dados fornecidos
    const newTransaction = transactionRepository.create({
      type,
      amount,
      account,
    });

    // Salva a nova transação no banco de dados
    await transactionRepository.save(newTransaction);

    // Retorna uma resposta de sucesso com os dados da transação criada
    res.status(201).json({ message: "Transação criada com sucesso", data: newTransaction });
  } catch (error) {
    // Captura e loga erros
    console.error("Erro ao criar transação:", error);
    res.status(500).json({ message: "Erro ao criar transação" });
  }
});

// Endpoint para obter uma transação pelo ID
router.get("/:id", async (req, res) => {
  // Obtém o ID da transação a partir dos parâmetros da solicitação
  const { id } = req.params;

  try {
    // Obtém o repositório de transações
    const transactionRepository = AppDataSource.getRepository(Transaction);
    // Busca a transação pelo ID fornecido
    const transaction = await transactionRepository.findOneBy({ id: parseInt(id) });

    // Verifica se a transação foi encontrada
    if (!transaction) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    // Retorna os dados da transação
    res.status(200).json({ data: transaction });
  } catch (error) {
    // Captura e loga erros
    console.error("Erro ao obter transação:", error);
    res.status(500).json({ message: "Erro ao obter transação" });
  }
});

export default router;
