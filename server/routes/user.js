import express, { Router } from "express";
import {
  login,
  registerUser,
  profile,
  getUserById,
  updateProfile,
  whoToFollow,
  followUser,
} from "../controllers/user.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/verify", verifyUser, profile);
router.put("/profile", verifyUser, updateProfile);
router.get("/suggestions", verifyUser, whoToFollow);
router.put("/follow/:id", verifyUser, followUser);
router.get("/:id", getUserById);

export default router;
