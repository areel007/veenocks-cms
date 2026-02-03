import { Router } from "express";
import {
  addContacts,
  getContacts,
  updateContacts,
  addFormInput,
  getFormInput,
} from "../../controllers/contacts/index.js";

const router = Router();

router.route("/page-text").post(addContacts).get(getContacts);
router.route("/page-text/:id").patch(updateContacts);

router.route("/form-input").post(addFormInput).get(getFormInput);

export default router;
