import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authmiddleware.js";

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", protect, getUserProfile);

export default router;
