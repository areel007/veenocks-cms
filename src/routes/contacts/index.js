import { Router } from "express";
import {
  addContacts,
  getContacts,
  updateContacts,
  addFormInput,
  getFormInput,
  downloadCSV,
  deleteAllFormInput,
} from "../../controllers/contacts/index.js";

const router = Router();

router.route("/page-text").post(addContacts).get(getContacts);
router.route("/page-text/:id").patch(updateContacts);

router.route("/form-input").post(addFormInput).get(getFormInput);

router.route("/form-input/download-csv").get(downloadCSV);

router.route("form-input/delete-all").delete(deleteAllFormInput);

export default router;
