import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import messageRoute from "./routes/messageRoute.js";
import { Server } from "socket.io";

const app = express();

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/messages", messageRoute);

// get driver connection
const expressServer = app.listen(port, async () => {
  // perform a database connection when server starts
  await connectToDb();
  console.log(`Server is running on port: ${port}`);
});

// Start websocket
const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5173", "http://87.52.110.172:5173"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });
});

// Connect to Database
const Db = process.env.ATLAS_URI;
const connectToDb = async () => {
  mongoose
    .connect(Db)
    .then(() => {
      console.log("Connected to MongoDB.");
    })
    .catch((error) => {
      console.error(error);
    });
};
