import io from "socket.io-client";
import { useEffect } from "react";
import MessageForm from "./components/MessageForm";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
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
    <div className="flex flex-row items-center justify-between w-full">
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <>
          <LogoutButton />
          <MessageForm socket={socket} />
          <p>User: {user?.name}</p>
        </>
      )}
    </div>
  );
}

export default App;
