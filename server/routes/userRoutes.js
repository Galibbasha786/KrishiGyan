// routes/userRoutes.js
import express from "express";
import { 
  getUserProfile, 
  updateUserProfile, 
  changePassword,
  deleteAccount 
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.put("/change-password", verifyToken, changePassword);
router.delete("/delete-account", verifyToken, deleteAccount);

export default router;