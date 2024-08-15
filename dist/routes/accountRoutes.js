"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../data-source");
const Account_1 = __importDefault(require("../models/Account"));
const router = (0, express_1.Router)();
// Endpoint para criar uma nova conta
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Desestrutura os dados da solicitação
    const { accountNumber, balance, ownerName, document } = req.body;
    // Verifica se todos os dados necessários foram fornecidos
    if (!accountNumber || balance === undefined || !ownerName || !document) {
        return res.status(400).json({ message: "Dados incompletos para criar a conta" });
    }
    try {
        // Obtém o repositório de contas
        const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.default);
        const account = new Account_1.default();
        // Atribui os dados recebidos à nova conta
        account.accountNumber = accountNumber;
        account.balance = balance;
        account.ownerName = ownerName;
        account.document = document;
        // Salva a nova conta no banco de dados
        yield accountRepository.save(account);
        // Retorna uma resposta de sucesso com os dados da conta criada
        res.status(201).json({ message: "Conta criada com sucesso", data: account });
    }
    catch (error) {
        // Captura e loga erros
        console.error("Erro ao criar conta:", error);
        res.status(500).json({ message: "Erro ao criar conta" });
    }
}));
// Endpoint para obter uma conta pelo número da conta
router.get("/:accountNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtém o número da conta a partir dos parâmetros da solicitação
    const { accountNumber } = req.params;
    try {
        // Obtém o repositório de contas
        const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.default);
        // Busca a conta pelo número fornecido
        const account = yield accountRepository.findOneBy({ accountNumber });
        // Verifica se a conta foi encontrada
        if (!account) {
            return res.status(404).json({ message: "Conta não encontrada" });
        }
        // Retorna os dados da conta
        res.status(200).json({ data: account });
    }
    catch (error) {
        // Captura e loga erros
        console.error("Erro ao obter conta:", error);
        res.status(500).json({ message: "Erro ao obter conta" });
    }
}));
exports.default = router;
