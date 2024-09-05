import { Router } from "express";
import {
  addAboutUs,
  getAboutUs,
  updateAboutUs,
} from "../../controllers/about-us/index.js";

const router = Router();

router.route("/").post(addAboutUs).get(getAboutUs);
router.route("/:id").patch(updateAboutUs);

export default router;
