import express from "express";
const router = express.Router();
import {
  createShareRequest,
  updateShareResponse,
  getReceivedShareRequests,
  getSentShareRequests,
} from "../controllers/shareRequestController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createShareRequest);
router.route("/:id/respond").put(protect, updateShareResponse);
router.route("/received").get(protect, getReceivedShareRequests);
router.route("/sent").get(protect, getSentShareRequests);

export default router;
