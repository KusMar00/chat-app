import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import messageRoute from "./routes/messageRoute.js";

const app = express();

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/messages", messageRoute);

// get driver connection
app.listen(port, async () => {
  // perform a database connection when server starts
  await connectToDb();
  console.log(`Server is running on port: ${port}`);
});

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
