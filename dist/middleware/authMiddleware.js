"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const validateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }
    // Lógica de validação do token (simulada aqui)
    if (token === "Bearer YOUR_VALID_TOKEN") {
        return next();
    }
    res.status(401).json({ message: "Token inválido." });
};
exports.validateToken = validateToken;
