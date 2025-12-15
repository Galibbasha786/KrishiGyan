// routes/incomeRoutes.js
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getIncome, saveIncome } from "../controllers/incomeController.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getIncome);
router.put("/", saveIncome);

export default router;


