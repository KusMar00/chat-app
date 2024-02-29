import { useAuth0 } from "@auth0/auth0-react";
import { useState, FormEvent } from "react";
import { Socket } from "socket.io-client";

const MessageForm = ({ socket }: { socket: Socket }) => {
  const [formValue, setFormValue] = useState("");
  const { user } = useAuth0();
  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("send_message", { message: formValue, user: user });
  };
  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        placeholder="Your Message"
        onChange={(e) => setFormValue(e.target.value)}
      />
      <input type="submit" value={"Send"} />
    </form>
  );
};

export default MessageForm;
