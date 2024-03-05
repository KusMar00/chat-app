import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="bg-slate-900 p-7 text-xl rounded-2xl text-white font-poppins border-4 border-slate-900 hover:border-slate-950 active:bg-slate-950"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
