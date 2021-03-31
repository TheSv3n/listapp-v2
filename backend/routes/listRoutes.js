import express from "express";
const router = express.Router();
import {
  createList,
  getUserLists,
  getSharedLists,
  updateListFinished,
  addListShare,
  removeListShare,
  getListInfo,
} from "../controllers/listController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createList);
router.route("/userlists").get(protect, getUserLists);
router.route("/sharedlists").get(protect, getSharedLists);
router.route("/:id").get(protect, getListInfo);
router.route("/:id/finished").put(protect, updateListFinished);
router.route("/:id/shareadd").put(protect, addListShare);
router.route("/:id/shareremove").put(protect, removeListShare);

export default router;
