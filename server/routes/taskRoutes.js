// routes/taskRoutes.js
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", addTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;


