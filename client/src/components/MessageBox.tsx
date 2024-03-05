import { MessageDTO } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

const MessageBox = ({ message }: { message: MessageDTO }) => {
  const { user } = useAuth0();
  return (
    <div
      className={`flex justify-center items-center font-poppins text-sm text-white p-3 rounded-3xl max-w-[45%] my-1 ${
        user === message.sender
          ? "bg-blue-600 text-white self-end"
          : "bg-gray-300 text-black self-start"
      } `}
    >
      <p>{message.message}</p>
    </div>
  );
};

export default MessageBox;
