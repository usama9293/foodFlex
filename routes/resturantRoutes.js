import express from "express";
const router = express.Router();
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
  removeMenuItem,
} from "../controllers/restController.js";
import { protect } from "../middleware/authmiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

router.route("/").post(protect, admin, createRestaurant).get(getRestaurants);

router
  .route("/:id")
  .get(getRestaurantById)
  .put(protect, admin, updateRestaurant)
  .delete(protect, admin, deleteRestaurant);

router.route("/:id/menu").post(protect, admin, addMenuItem);

router.route("/:id/menu/:menuItemId").delete(protect, admin, removeMenuItem);

export default router;
