import React from "react";
import HeaderTitle from "../components/atoms/typography/HeaderTitle";
import { useAuth } from "../context/AuthContext";

export default function AccountPage() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="px-5">
        <HeaderTitle
          title="Account"
          subtitle="Access your account details in here"
        />
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
    </>
  );
}
