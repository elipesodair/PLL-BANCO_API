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
const express_1 = require("express");
const Account_1 = require("../models/Account");
const typeorm_1 = require("typeorm");
const router = (0, express_1.Router)();
// Rota para criar uma nova conta
router.post("/account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numeroConta, saldoAtual, nomeCliente } = req.body;
    // Criando uma nova instância de Account
    const account = new Account_1.Account();
    account.accountNumber = numeroConta;
    account.balance = saldoAtual;
    account.ownerName = nomeCliente;
    try {
        // Salvando a conta no banco de dados usando o TypeORM
        const accountRepository = (0, typeorm_1.getRepository)(Account_1.Account);
        yield accountRepository.save(account);
        res.status(201).json(account);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar a conta", error });
    }
}));
// Rota para buscar uma conta pelo número da conta
router.get("/account/:accountNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountNumber = req.params.accountNumber;
    try {
        // Buscando a conta no banco de dados pelo número da conta
        const accountRepository = (0, typeorm_1.getRepository)(Account_1.Account);
        const account = yield accountRepository.findOne({
            where: { accountNumber },
        });
        if (account) {
            res.json({
                numeroConta: account.accountNumber,
                saldoAtual: account.balance,
                nomeCliente: account.ownerName,
            });
        }
        else {
            res.status(404).json({ message: "Conta não encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar a conta", error });
    }
}));
exports.default = router;
