import React from "react";
import HeaderTitle from "../components/atoms/typography/HeaderTitle";
import { useAuth } from "../context/AuthContext";
import { generateFallbackFromName } from "../utils/misc";
import { LogOut } from "lucide-react";

export default function AccountPage() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="px-5">
        <HeaderTitle title="Account" />
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f5f5f5] text-gray-700 md:text-2xl font-bold">
                {generateFallbackFromName(user.fullname)}
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="font-semibold">{user.fullname}</h1>
              <p className="text-[#737373]">{user.email}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 flex gap-2 items-center px-6 py-2 text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white rounded-md transition text-sm"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );
}
