"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Rota para validar o token
router.get("/validate-token", authMiddleware_1.validateToken, (req, res) => {
    res.status(200).json({ message: "Token is valid" });
});
exports.default = router;
