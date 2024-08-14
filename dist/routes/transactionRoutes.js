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
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Account_1 = __importDefault(require("../models/Account"));
const router = (0, express_1.Router)();
// Endpoint para criar uma nova transação
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountNumber, type, amount } = req.body;
    try {
        const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.default);
        const account = yield accountRepository.findOneBy({ accountNumber });
        if (!account) {
            return res.status(404).json({ message: "Conta não encontrada" });
        }
        const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.default);
        const newTransaction = transactionRepository.create({
            type,
            amount,
            account, // Associa a transação à conta encontrada
        });
        yield transactionRepository.save(newTransaction);
        // Atualiza o saldo da conta
        if (type === "deposit") {
            account.balance += amount;
        }
        else if (type === "withdraw" && account.balance >= amount) {
            account.balance -= amount;
        }
        else if (type === "withdraw" && account.balance < amount) {
            return res.status(400).json({ message: "Saldo insuficiente" });
        }
        yield accountRepository.save(account);
        res.status(201).json({ message: "Transação criada com sucesso", data: newTransaction });
    }
    catch (error) {
        console.error("Erro ao criar transação:", error);
        res.status(500).json({ message: "Erro ao criar transação" });
    }
}));
exports.default = router;
