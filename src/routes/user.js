import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middlewares/authenticate.user.js";

const router = Router();

router.route("/").get(authenticateUser, getUsers);
router
  .route("/:id")
  .get(getUser)
  .delete(authenticateUser, authorizeRoles("super_admin"), deleteUser)
  .patch(authenticateUser, authorizeRoles("super_admin"), updateUser);

router
  .route("/change-password")
  .patch(authenticateUser, authorizeRoles("super_admin"), updateUser);

export default router;
