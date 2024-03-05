import { User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { Socket } from "socket.io-client";
import { MessageDTO } from "@/types";

const ChatWindow = ({ socket }: { socket: Socket }) => {
  const [messages, setMessages] = useState(Array<MessageDTO>);
  useEffect(() => {
    socket.on(
      "receive_message",
      (data: { message: string; sender: User | undefined }) => {
        console.log(messages);
        setMessages([...messages, data]);
      }
    );
  }, []);
  return (
    <div className="p-7 sm:w-[50%] w-[95%] h-[70%]  bg-slate-700 border-1 border-white rounded-xl flex flex-col mb-5">
      {messages.map((message) => (
        <MessageBox key="" message={message} />
      ))}
    </div>
  );
};

export default ChatWindow;
