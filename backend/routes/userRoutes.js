import express from "express";
import {
  authUser,
  createUser,
  getUserProfile,
  getUsersAdmin,
  getUsersCustomer,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/admin/users").get(protect, getUsersAdmin);
router.route("/customer/users").get(protect, getUsersCustomer);
router.route("/create").post(protect, createUser);

export default router;
