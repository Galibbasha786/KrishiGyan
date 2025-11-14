import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addFarm, getFarms, updateFarm, deleteFarm } from "../controllers/farmController.js";

const router = express.Router();

router.post("/", verifyToken, addFarm);
router.get("/", verifyToken, getFarms);
router.put("/:id", verifyToken, updateFarm);
router.delete("/:id", verifyToken, deleteFarm);

export default router;
