"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não fornecido ou inválido." });
    }
    const token = authHeader.split(" ")[1];
    // Lógica de validação do token (simulada aqui)
    if (token === "YOUR_VALID_TOKEN") {
        return next();
    }
    res.status(401).json({ message: "Token inválido." });
};
exports.validateToken = validateToken;
