import User from "../models/userModel.js";
import { generateToken } from "../lib/utils/tokenUtils.js";
import cloudinary from "../lib/utils/cloudinary.js";

export const signUp = async (req, res, next) => {
  try {
    const { fullName, email, password, profilePic, bio } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profilePic,
      bio,
    });

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      data: user,
      token,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    const token = generateToken(user._id);

    return res
      .status(200)
      .json({ success: true, token, user, message: "Login successfull" });
  } catch (error) {
    next(error);
  }
};

export const chechAuth = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
};

// export const logout = async (req, res, next) => {
//   try {
//     const token = req.cookies.refreshToken;
//     if (!token) return res.sendStatus(204);

//     const user = await User.findOne({ refreshToken: token });
//     if (user) {
//       (user.refreshToken = ""), await user.save();
//     }

//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "strict",
//     });
//     res.status(200).json({ success: true, message: "Logged out successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { profilePic, bio, fullName } = req.body;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "User profile updated",
    });
  } catch (error) {
    next(error);
  }
};
