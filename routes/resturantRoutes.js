import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} from "../controllers/restaurantController";

const router = Router();

router.post("/create", authMiddleware, createRestaurantController);
router.get("/getAll", getAllRestaurantController);
router.get("/get/:id", getRestaurantByIdController);
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

export default router;
