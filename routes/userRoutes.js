import express from "express";
const router = express.Router();
import { registerUser, authUser } from "../controllers/userController.js";
import { protect } from "../middleware/authmiddleware.js";

router.post("/", registerUser);
router.post("/login", authUser);

export default router;
