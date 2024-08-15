"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
// Middleware para validar o token de autenticação
const validateToken = (req, res, next) => {
    // Obtém o cabeçalho de autorização da solicitação
    const authHeader = req.headers["authorization"];
    // Verifica se o cabeçalho de autorização está presente e se começa com "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não fornecido ou inválido." });
    }
    // Extrai o token do cabeçalho
    const token = authHeader.split(" ")[1];
    // Lógica de validação do token (simulada aqui)
    if (token === "YOUR_VALID_TOKEN") {
        // Se o token for válido, passa para o próximo middleware
        return next();
    }
    // Se o token for inválido, retorna um erro 401
    res.status(401).json({ message: "Token inválido." });
};
exports.validateToken = validateToken;
