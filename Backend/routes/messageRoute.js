import express from "express";
import {
  getMessages,
  getUsersForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/messageController.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/users", verifyUser, getUsersForSidebar);
router.get("/:id", verifyUser, getMessages);
router.put("/mark/:id", verifyUser, markMessageAsSeen);
router.post("/send/:id", verifyUser, sendMessage);

export default router;
