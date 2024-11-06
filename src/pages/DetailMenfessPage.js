import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderTitle from "../components/atoms/typography/HeaderTitle";
import Card from "../components/atoms/card/CardMenfess";
import SkeletonCardMenfess from "../components/atoms/card/SkeletonCardMenfess";
import { useAuth } from "../context/AuthContext";
import { generateFallbackFromName } from "../utils/misc";
import {
  format,
  formatDate,
  formatDistanceToNowStrict,
  parseISO,
} from "date-fns";
import { SendHorizonal } from "lucide-react";

const DetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [noComments, setNoComments] = useState(false);
  const { token } = useAuth();

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api-tekkomfess.vercel.app/api/menfess/${id}`
      );
      setData(response.data.data);
      const fetchedComments = response.data.data.comments || [];
      setComments(fetchedComments);
      setNoComments(fetchedComments.length === 0);
    } catch (error) {
      console.error("Error fetching detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await axios.post(
        `https://api-tekkomfess.vercel.app/api/menfess/${id}/comment`,
        { comment: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchDetail();

      setComment("");
      setNoComments(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const convertTimestampToDate = (seconds, nanoseconds) => {
    const timestamp = seconds * 1000 + nanoseconds / 1000000;
    return new Date(timestamp);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Invalid date";

    const date = convertTimestampToDate(
      timestamp.seconds,
      timestamp.nanoseconds
    );

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

  return (
    <>
      <div className="px-5 min-h-[80vh]">
        <HeaderTitle
          title="Detail Menfess"
          subtitle="Find unique stories in here"
        />
        <div>
          {loading ? (
            <SkeletonCardMenfess />
          ) : data ? (
            <Card item={data} />
          ) : (
            <p>No data available.</p>
          )}
        </div>

        <div className="mt-5 md:space-y-4 space-y-2">
          <h3 className="font-semibold">Replies</h3>
          <div className="space-y-4">
            {noComments ? (
              <p className="text-[#737373] text-sm">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment, index) => (
                <div
                  className="bg-white shadow rounded-lg p-4 mb-4 text-left space-y-2"
                  key={index}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-muted">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f5f5f5] text-gray-700 text-sm">
                          {comment.userInfo
                            ? generateFallbackFromName(
                                comment.userInfo.fullname
                              )
                            : "Unknown User"}
                        </div>
                      </div>
                      <h1 className="text-sm">
                        {comment.userInfo
                          ? comment.userInfo.fullname
                          : "Unknown User"}
                      </h1>
                    </div>
                    <div>
                      <p className="text-sm text-[#737373]">
                        {formatDate(comment.created_at)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">{comment.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="z-50 flex justify-around items-center max-w-[430px] border-t-[1px] fixed bottom-16 pb-2 pt-6 w-full px-5 bg-white rounded-lg">
        {!token ? (
          <div className="px-4 py-2 border border-gray-300 rounded-full text-sm w-full text-center text-[#737373]">
            <p>Please login first to comment</p>
          </div>
        ) : (
          <form
            onSubmit={handleCommentSubmit}
            className="w-full flex items-center gap-2"
          >
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="px-4 py-2 border border-gray-300 rounded-full text-sm w-full focus:outline-none focus:border-[#0288d1]"
            />
            <button type="submit" className="bg-transparent">
              <SendHorizonal />
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default DetailPage;
