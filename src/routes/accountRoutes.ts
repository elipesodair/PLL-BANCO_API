import { Router } from "express";
import { AppDataSource } from "../data-source";
import Account from "../models/Account";

const router = Router();

// Endpoint para criar uma nova conta
router.post("/", async (req, res) => {
  const { accountNumber, balance, ownerName, document } = req.body;

  if (!accountNumber || balance === undefined || !ownerName || !document) {
    return res.status(400).json({ message: "Dados incompletos para criar a conta" });
  }

  try {
    const accountRepository = AppDataSource.getRepository(Account);
    const account = new Account();
    account.accountNumber = accountNumber;
    account.balance = balance;
    account.ownerName = ownerName;
    account.document = document;

    await accountRepository.save(account);
    res.status(201).json({ message: "Conta criada com sucesso", data: account });
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    res.status(500).json({ message: "Erro ao criar conta" });
  }
});

// Endpoint para obter uma conta pelo número da conta
router.get("/:accountNumber", async (req, res) => {
  const { accountNumber } = req.params;

  try {
    const accountRepository = AppDataSource.getRepository(Account);
    const account = await accountRepository.findOneBy({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Conta não encontrada" });
    }

    res.status(200).json({ data: account });
  } catch (error) {
    console.error("Erro ao obter conta:", error);
    res.status(500).json({ message: "Erro ao obter conta" });
  }
});

export default router;
