import io from "socket.io-client";
import { useEffect } from "react";
import MessageForm from "./components/MessageForm";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import ChatWindow from "./components/ChatWindow";
import { useAuth0 } from "@auth0/auth0-react";

const URL = "http://localhost:5000";
const socket = io(URL);

function App() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data.message);
    });
  }, [socket]);

  return (
    <div>
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <div className="flex flex-col justify-around items-center w-full h-[100vh] bg-gray-900">
          <LogoutButton />
          <ChatWindow />
          <MessageForm socket={socket} />
          <p>User: {user?.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;
