import { useAuth0, User } from "@auth0/auth0-react";

const MessageBox = ({
  message,
}: {
  message: { message: String; sender: User | undefined };
}) => {
  const { user } = useAuth0();
  return (
    <div
      className={`flex justify-center items-center font-poppins text-white py-3 px-5 rounded-3xl max-w-[30%] my-1 ${
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
