import express from "express";
const router = express.Router();
import {
  createFriendRequest,
  updateFriendResponse,
} from "../controllers/friendRequestController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createFriendRequest);
router.route("/:id/respond").put(protect, updateFriendResponse);

export default router;
