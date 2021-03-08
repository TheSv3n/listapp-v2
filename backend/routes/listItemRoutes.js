import express from "express";
const router = express.Router();
import {
  createListItem,
  getListItems,
} from "../controllers/listItemController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createListItem);
router.route("/:id").get(protect, getListItems);

export default router;
