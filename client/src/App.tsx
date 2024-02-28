import io from "socket.io-client";
import { useState, useEffect, FormEvent } from "react";

const URL = "http://localhost:5000";
const socket = io(URL);

function App() {
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data.message);
    });
  }, [socket]);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("send_message", { message: formValue });
  };
  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Your Message"
          onChange={(e) => setFormValue(e.target.value)}
        />
        <input type="submit" value={"Send"} />
      </form>
    </div>
  );
}

export default App;
