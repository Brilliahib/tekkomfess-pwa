import { Handshake, Home, Plus, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const location = useLocation();
  return (
    <>
      <div className="z-50 bg-white flex justify-around items-center max-w-[430px] py-5 border-t-[1px] fixed bottom-0 w-full text-[#707170]">
        <Link
          to="/"
          className={location.pathname === "/" ? "text-[#0288d1]" : ""}
        >
          <Home />
        </Link>
        <Link
          to="/menfess/create"
          className={`bg-[#f5f5f5] p-2 rounded-xl ${
            location.pathname.startsWith("/menfess/create")
              ? "text-[#0288d1]"
              : ""
          }`}
        >
          <Plus />
        </Link>
        <Link
          to="/users"
          className={`${
            location.pathname.startsWith("/users") ? "text-[#0288d1]" : ""
          }`}
        >
          <Handshake />
        </Link>
        <Link
          to="/account"
          className={location.pathname === "/account" ? "text-[#0288d1]" : ""}
        >
          <User />
        </Link>
      </div>
    </>
  );
}
