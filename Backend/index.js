import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDb from "./lib/db/connectDb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import messageRoutes from "./routes/messageRoute.js";

dotenv.config();
connectDb();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" },
});

//Store online users
export const userSocketMap = {}; // {userId: socketId }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  //Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", userId);
    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middlewares
app.use(express.json({ limit: "4mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//Routes
app.use("/api/v1/user", userRoutes);
//http://localhost:3000/api/v1/user/signup
app.use("/api/v1/message", messageRoutes);
//http://localhost:3000/api/v1/message/users

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});
