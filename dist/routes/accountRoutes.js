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
    const { accountNumber, balance, ownerName, document } = req.body;
    if (!accountNumber || balance === undefined || !ownerName || !document) {
        return res.status(400).json({ message: "Dados incompletos para criar a conta" });
    }
    try {
        const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.default);
        const newAccount = accountRepository.create({
            accountNumber,
            balance,
            ownerName,
            document,
        });
        yield accountRepository.save(newAccount);
        res.status(201).json({ message: "Conta criada com sucesso", data: newAccount });
    }
    catch (error) {
        console.error("Erro ao criar conta:", error);
        res.status(500).json({ message: "Erro ao criar conta" });
    }
}));
exports.default = router; // Alterado para exportação padrão
