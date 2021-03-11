import express from "express";
const router = express.Router();
import {
  createFriendRequest,
  updateFriendResponse,
  getReceivedFriendRequests,
  getSentFriendRequests,
} from "../controllers/friendRequestController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createFriendRequest);
router.route("/:id/respond").put(protect, updateFriendResponse);
router.route("/received").get(protect, getReceivedFriendRequests);
router.route("/sent").get(protect, getSentFriendRequests);

export default router;
