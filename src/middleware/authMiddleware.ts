// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
