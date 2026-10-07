import { Router } from "express";
import {
    getStationery,
    getStationeryById,
    createStationery,
    updateStationery,
    deleteStationery,
} from "../controllers/stationeryController.js";
import { validateStationery } from "../middleware/validateStationery.js";

const router = Router();

router.get("/", getStationery);
router.get("/:id", getStationeryById);
router.post("/", validateStationery, createStationery);
router.put("/:id", validateStationery, updateStationery);
router.delete("/:id", deleteStationery);

export default router;
