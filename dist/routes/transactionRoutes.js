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
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/transactionRoutes.ts
const express_1 = require("express");
const data_source_1 = require("../data-source");
const Transaction_1 = require("../models/Transaction");
const Account_1 = require("../models/Account");
const router = (0, express_1.Router)();
// Endpoint para criar uma nova transação
router.post("/transaction", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, amount, date, accountId } = req.body;
    try {
        const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
        const account = yield accountRepository.findOneBy({ id: accountId });
        if (!account) {
            return res.status(404).json({ error: "Conta não encontrada" });
        }
        const transaction = new Transaction_1.Transaction(type, amount, new Date(date), account); // Corrigido para incluir 'type'
        const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
        yield transactionRepository.save(transaction);
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error("Erro ao criar transação:", error);
        res.status(500).json({ error: "Erro ao criar transação" });
    }
}));
exports.default = router;
