import express from "express";
import http from "http";
import cors from "cors";
// import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDb from "./lib/db/connectDb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";

dotenv.config();
connectDb();

const app = express();
const server = http.createServer(app);

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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});
