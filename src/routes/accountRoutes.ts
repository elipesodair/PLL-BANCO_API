import { Router } from "express";
import { AppDataSource } from "../data-source";
import Account from "../models/Account";

const router = Router();

// Endpoint para criar uma nova conta
router.post("/", async (req, res) => {
  // Desestrutura os dados da solicitação
  const { accountNumber, balance, ownerName, document } = req.body;

  // Verifica se todos os dados necessários foram fornecidos
  if (!accountNumber || balance === undefined || !ownerName || !document) {
    return res.status(400).json({ message: "Dados incompletos para criar a conta" });
  }

  try {
    // Obtém o repositório de contas
    const accountRepository = AppDataSource.getRepository(Account);
    const account = new Account();
    // Atribui os dados recebidos à nova conta
    account.accountNumber = accountNumber;
    account.balance = balance;
    account.ownerName = ownerName;
    account.document = document;

    // Salva a nova conta no banco de dados
    await accountRepository.save(account);
    // Retorna uma resposta de sucesso com os dados da conta criada
    res.status(201).json({ message: "Conta criada com sucesso", data: account });
  } catch (error) {
    // Captura e loga erros
    console.error("Erro ao criar conta:", error);
    res.status(500).json({ message: "Erro ao criar conta" });
  }
});

// Endpoint para obter uma conta pelo número da conta
router.get("/:accountNumber", async (req, res) => {
  // Obtém o número da conta a partir dos parâmetros da solicitação
  const { accountNumber } = req.params;

  try {
    // Obtém o repositório de contas
    const accountRepository = AppDataSource.getRepository(Account);
    // Busca a conta pelo número fornecido
    const account = await accountRepository.findOneBy({ accountNumber });

    // Verifica se a conta foi encontrada
    if (!account) {
      return res.status(404).json({ message: "Conta não encontrada" });
    }

    // Retorna os dados da conta
    res.status(200).json({ data: account });
  } catch (error) {
    // Captura e loga erros
    console.error("Erro ao obter conta:", error);
    res.status(500).json({ message: "Erro ao obter conta" });
  }
});

export default router;
