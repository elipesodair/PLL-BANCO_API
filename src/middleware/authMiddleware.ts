import { Request, Response, NextFunction } from "express";

// Middleware para validar o token de autenticação
export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
