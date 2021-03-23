import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  updateUserFriendList,
  getUserById,
  getFriendList,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/friendlist").post(protect, getFriendList);
router.route("/:id").get(protect, getUserById);
router.route("/login").post(authUser);

router.route("/:id/friendlist").put(protect, updateUserFriendList);

export default router;
