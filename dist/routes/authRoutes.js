"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Rota para validar o token
// O middleware validateToken verifica a validade do token antes de chegar ao handler da rota
router.get("/validate-token", authMiddleware_1.validateToken, (req, res) => {
    // Se o token for válido, retorna uma resposta de sucesso
    res.status(200).json({ message: "Token is valid" });
});
exports.default = router;
