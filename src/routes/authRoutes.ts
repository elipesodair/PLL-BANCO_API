import { Router } from "express";
import { validateToken } from "../middleware/authMiddleware";

const router = Router();

// Rota para validar o token
// O middleware validateToken verifica a validade do token antes de chegar ao handler da rota
router.get("/validate-token", validateToken, (req, res) => {
  // Se o token for válido, retorna uma resposta de sucesso
  res.status(200).json({ message: "Token is valid" });
});

export default router;

