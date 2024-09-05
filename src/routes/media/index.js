import { Router } from "express";
import {
  addMedia,
  deleteMedia,
  getMedia,
} from "../../controllers/media/index.js";

const router = Router();

router.route("/").post(addMedia).get(getMedia);
router.route("/:id").delete(deleteMedia);

export default router;
