import express from "express";
import {
    login, registerUser, profile, getUserById, changePassword, changeProfileImage, addEvent, joinEvent, getAllEvents, getEventById
} from "../controllers/user.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/verify", verifyUser, profile);
router.put("/change-password", verifyUser, changePassword);
router.put("/change-profile-image", verifyUser, changeProfileImage);
router.post("/add-event", verifyUser, addEvent);
router.post("/join-event", verifyUser, joinEvent);
router.get("/get-all-events", getAllEvents);
router.get("/get-event/:id", getEventById);
router.get("/:id", getUserById);

export default router;