import express from "express";
import {
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
router.post("/logout", logout);

export default router;
