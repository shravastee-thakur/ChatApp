import express from "express";
import {
  chechAuth,
  login,
  logout,
  signUp,
  updateProfile,
} from "../controllers/userController.js";
import { verifyUser } from "../middlewares/authMiddleware.js";
import {
  loginValidation,
  signUpValidation,
} from "../lib/validation/joiValidation.js";
const router = express.Router();

router.post("/signup", signUpValidation, signUp);
router.post("/login", loginValidation, login);
router.put("/updateProfile", verifyUser, updateProfile);
router.get("/check", verifyUser, chechAuth);

export default router;
