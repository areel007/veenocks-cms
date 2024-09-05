import { Router } from "express";
import {
  addFactory,
  getFactory,
  updateFactory,
} from "../../controllers/factory/index.js";

const router = Router();

router.route("/").post(addFactory).get(getFactory);

router.route("/:id").patch(updateFactory);

export default router;
