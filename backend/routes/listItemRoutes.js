import express from "express";
const router = express.Router();
import {
  createListItem,
  getListItems,
  updateCompleted,
  updateDeleted,
  addNewSubItem,
  updateSubItemCompleted,
  deleteSubItem,
} from "../controllers/listItemController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createListItem);
router.route("/:id").get(protect, getListItems);
router.route("/:id/completed").put(protect, updateCompleted);
router.route("/:id/deleted").put(protect, updateDeleted);
router.route("/:id/subitems").post(protect, addNewSubItem);
router.route("/:id/subitems/completed").put(protect, updateSubItemCompleted);
router.route("/:id/subitems/deleted").put(protect, deleteSubItem);

export default router;
