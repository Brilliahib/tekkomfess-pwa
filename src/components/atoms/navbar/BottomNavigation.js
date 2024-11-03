import { Home, MessageCircleMore, User } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const location = useLocation();
  return (
    <>
      <div className="flex justify-around items-center max-w-[430px] py-5 border-t-[1px] fixed bottom-0 w-full text-[#707170]">
        <a
          href="/"
          className={location.pathname === "/" ? "text-[#0288d1]" : ""}
        >
          <Home />
        </a>
        <a
          href="/messages"
          className={location.pathname === "/messages" ? "text-[#0288d1]" : ""}
        >
          <MessageCircleMore />
        </a>
        <a
          href="/profile"
          className={location.pathname === "/profile" ? "text-[#0288d1]" : ""}
        >
          <User />
        </a>
      </div>
    </>
  );
}
