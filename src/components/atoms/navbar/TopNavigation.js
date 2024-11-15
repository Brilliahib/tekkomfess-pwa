import { Bell, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopNavigation(props) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-7 mb-8 items-center">
      <div>
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div>
        <h1 className="font-bold">{props.title}</h1>
      </div>
      <div>
        <Bell className="h-5 w-5" />
      </div>
    </div>
  );
}
