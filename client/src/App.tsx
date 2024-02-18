import { io } from "socket.io-client";
import { useState, useEffect } from "react";

function App() {
  const URL = "http://localhost:5000";
  const socket = io(URL);

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.timeout(5000).emit("create-something", "Hello, Wolrd");

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <button>Send</button>
    </div>
  );
}

export default App;
