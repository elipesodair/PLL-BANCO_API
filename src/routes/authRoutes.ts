import { Router } from "express";
import { validateToken } from "../middleware/authMiddleware";

const router = Router();

// Rota para validar o token
router.get("/validate-token", validateToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

export default router;
