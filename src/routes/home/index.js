import { Router } from "express";
import {
  addFooter,
  addHomeAbout,
  addHomeCommitment,
  addHomeCoreValues,
  addHomeOurProducts,
  getFooter,
  getHomeAbout,
  getHomeCommitment,
  getHomeCoreValues,
  getHomeOurProducts,
  updateFooter,
  updateHomeAbout,
  updateHomeCommitment,
  updateHomeCoreValues,
  updateHomeOurProducts,
} from "../../controllers/home/index.js";

const router = Router();

router.route("/about").post(addHomeAbout);
router.route("/about/:id").get(getHomeAbout).patch(updateHomeAbout);

router.route("/core-values").post(addHomeCoreValues);
router
  .route("/core-values/:id")
  .get(getHomeCoreValues)
  .patch(updateHomeCoreValues);

router.route("/our-products").post(addHomeOurProducts);
router
  .route("/our-products/:id")
  .get(getHomeOurProducts)
  .patch(updateHomeOurProducts);

router.route("/commitment").post(addHomeCommitment);
router
  .route("/commitment/:id")
  .get(getHomeCommitment)
  .patch(updateHomeCommitment);

router.route("/footer").post(addFooter);
router.route("/footer/:id").get(getFooter).patch(updateFooter);

export default router;
