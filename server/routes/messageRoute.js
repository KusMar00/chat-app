import express from "express";
import { Message } from "../models/messageModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (!request.body.text || !request.body.author) {
      return response.status(400).send({
        message: "Please provide all required fields: Message & Author",
      });
    }
    const newMessage = {
      text: request.body.text,
      author: request.body.author,
    };
    const message = await Message.create(newMessage);
    return response.status(201).send(message);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

export default router;
