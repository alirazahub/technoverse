import express from "express";
import {
    login, registerUser, profile, getUserById, changeProfileImage, addEvent, joinEvent, getAllEvents, getEventById, updateProfile
} from "../controllers/user.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/verify", verifyUser, profile);
router.put("/profile", verifyUser, updateProfile);
router.post("/add-event", verifyUser, addEvent);
router.post("/join-event", verifyUser, joinEvent);
router.get("/get-all-events", getAllEvents);
router.get("/get-event/:id", getEventById);
router.get("/:id", getUserById);

export default router;
