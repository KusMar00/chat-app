import { useAuth0 } from "@auth0/auth0-react";
import { useState, FormEvent } from "react";
import { Socket } from "socket.io-client";

const MessageForm = ({ socket }: { socket: Socket }) => {
  const [formValue, setFormValue] = useState("");
  const { user } = useAuth0();
  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("send_message", { message: formValue, user: user });
    setFormValue("");
  };
  return (
    <form
      onSubmit={sendMessage}
      className="w-[40%] flex justify-between items-center"
    >
      <input
        className="bg-white text-black font-poppins text-sm border-none rounded-3xl h-full w-[87%] p-3"
        type="text"
        placeholder="Your Message"
        onChange={(e) => setFormValue(e.target.value)}
        value={formValue}
      />
      <input
        className="p-2 bg-blue-600 rounded-3xl font-poppins text-white w-[10%] cursor-pointer active:bg-blue-700 border-2 border border-blue-600 hover:border-blue-800 md:relative hidden"
        type="submit"
        value={"Send"}
      />
    </form>
  );
};

export default MessageForm;
