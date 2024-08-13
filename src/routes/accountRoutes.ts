import { Router } from "express";
import { Account } from "../models/Account";
import { getRepository } from "typeorm";

const router = Router();

// Rota para criar uma nova conta
router.post("/account", async (req, res) => {
  const { numeroConta, saldoAtual, nomeCliente } = req.body;

  // Criando uma nova instância de Account
  const account = new Account();
  account.accountNumber = numeroConta;
  account.balance = saldoAtual;
  account.ownerName = nomeCliente;

  try {
    // Salvando a conta no banco de dados usando o TypeORM
    const accountRepository = getRepository(Account);
    await accountRepository.save(account);

    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar a conta", error });
  }
});

// Rota para buscar uma conta pelo número da conta
router.get("/account/:accountNumber", async (req, res) => {
  const accountNumber = req.params.accountNumber;

  try {
    // Buscando a conta no banco de dados pelo número da conta
    const accountRepository = getRepository(Account);
    const account = await accountRepository.findOne({
      where: { accountNumber },
    });

    if (account) {
      res.json({
        numeroConta: account.accountNumber,
        saldoAtual: account.balance,
        nomeCliente: account.ownerName,
      });
    } else {
      res.status(404).json({ message: "Conta não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar a conta", error });
  }
});

export default router;
