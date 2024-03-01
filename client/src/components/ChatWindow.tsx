import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import MessageBox from "./MessageBox";

const ChatWindow = () => {
  const { user } = useAuth0();
  const [messages, setMessages] = useState([
    { message: "Hello, World", sender: user },
    {
      message:
        "This is a really long message how do i handle this scenario perhchance. This is my first time on live televisions i like rollercoasters and dinosaurs",
      sender: undefined,
    },
    {
      message: "Goopy woopy",
      sender: undefined,
    },
    { message: "Well Said", sender: user },
  ]);
  return (
    <div className="p-10 h-[70%] w-[50%] bg-slate-800 border-1 border-white rounded-xl flex flex-col">
      {messages.map((message) => (
        <MessageBox message={message} />
      ))}
    </div>
  );
};

export default ChatWindow;
