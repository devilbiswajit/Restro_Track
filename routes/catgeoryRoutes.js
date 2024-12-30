import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} from "../controllers/categoryController";

const router = Router();

router.post("/create", authMiddleware, createCatController);
router.get("/getAll", getAllCatController);
router.put("/update/:id", authMiddleware, updateCatController);
router.delete("/delete/:id", authMiddleware, deleteCatController);

export default router;
