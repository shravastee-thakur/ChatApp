import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.header.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User no longer exists",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
