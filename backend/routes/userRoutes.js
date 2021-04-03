import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  addUserFriend,
  getUserById,
  getFriendList,
  getSearchResults,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/friendlist").post(protect, getFriendList);
router.route("/search").get(protect, getSearchResults);
router.route("/:id").get(protect, getUserById);
router.route("/login").post(authUser);

router.route("/:id/friendadd").put(protect, addUserFriend);

export default router;
