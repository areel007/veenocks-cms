import { Router } from "express";
import { loginUser, refreshToken, registerUser } from "../controllers/auth.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshToken);

export default router;
