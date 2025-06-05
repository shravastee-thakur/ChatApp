import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import cloudinary from "../lib/utils/cloudinary.js";
import { io, userSocketMap } from "../index.js";

export const getUsersForSidebar = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    //Count number of messages not seen
    const unseenMessages = {};

    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });

      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }

      await Promise.all(promises);
      res.json({ success: true, users: filteredUsers, unseenMessages });
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const selectedUserId = req.params.id;
    const myId = req.user.id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });

    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );
    res.json({ success: true, messages });
  } catch (error) {
    next(error);
  }
};

//api to mark message as seen using message id

export const markMessageAsSeen = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
export const sendMessage = async (req, res, next) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user.id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    //Emit the new message to receivers socket
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.json({ success: true, newMessage });
  } catch (error) {
    next(error);
  }
};
