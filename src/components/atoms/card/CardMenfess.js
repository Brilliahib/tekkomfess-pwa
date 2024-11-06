import React from "react";
import { formatDistanceToNowStrict, parseISO, format } from "date-fns";
import { generateFallbackFromName } from "../../../utils/misc";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNowStrict(date, { addSuffix: false })
        .replace(" hours", "h")
        .replace(" minutes", "m")
        .replace(" seconds", "s");
    }

    return format(date, "dd/MM/yyyy");
  };

  const handleClick = () => {
    navigate(`/menfess/${item.id}`);
  };

  return (
    <div
      className="bg-white shadow rounded-lg p-4 mb-4 text-left space-y-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-muted">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f5f5f5] text-gray-700 text-sm">
              {generateFallbackFromName(item.user.fullname)}
            </div>
          </div>
          <h1 className="text-sm">{item.user.fullname}</h1>
        </div>
        <div>
          <p className="text-sm text-[#737373]">
            {formatDate(item.created_at)}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm">{item.message}</p>
        {item.images && item.images.length > 0 && (
          <img src={item.images[0]} alt="post image" className="mt-2 rounded" />
        )}
      </div>
    </div>
  );
};

export default Card;
