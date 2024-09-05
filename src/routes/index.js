import { Router } from "express";
import auth from "./auth.js";
import user from "./user.js";
import home from "./home/index.js";
import aboutUs from "./about-us/index.js";
import factory from "./factory/index.js";

const router = Router();

router.use("/api/auth", auth);
router.use("/api/users", user);
router.use("/api/home", home);
router.use("/api/about-us", aboutUs);
router.use("/api/factory", factory);

export default router;
