import MessageForm from "./components/MessageForm";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import ChatWindow from "./components/ChatWindow";
import { useAuth0 } from "@auth0/auth0-react";
import socket from "./lib/socket";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      let id = undefined;
      getIdTokenClaims().then((claims) => {
        id = claims?.aud;
        console.log(id);
        socket.auth = getIdTokenClaims();
        socket.connect();
      });
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full h-[100vh] bg-gray-800 flex items-center justify-center">
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <div className="flex flex-col justify-around items-center w-full h-full">
          <LogoutButton />
          <ChatWindow socket={socket} />
          <MessageForm socket={socket} />
        </div>
      )}
    </div>
  );
}

export default App;
