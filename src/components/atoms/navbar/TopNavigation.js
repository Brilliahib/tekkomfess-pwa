import { Bell, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function TopNavigation(props) {
  return (
    <>
      <div className="flex justify-between mt-7 mb-8 items-center">
        <div>
          <Link to="/">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>
        <div>
          <h1 className="font-bold">{props.title}</h1>
        </div>
        <div>
          <Bell className="h-5 w-5" />
        </div>
      </div>
    </>
  );
}
