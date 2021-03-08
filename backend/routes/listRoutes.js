import express from "express";
const router = express.Router();
import { createList, getUserLists } from "../controllers/listController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createList);
router.route("/userlists").get(protect, getUserLists);

export default router;
