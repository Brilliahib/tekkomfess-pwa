import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/atoms/card/CardMenfess";
import { Bell, TriangleAlert } from "lucide-react";
import SkeletonCardMenfess from "../components/atoms/card/SkeletonCardMenfess";

export default function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-tekkomfess.vercel.app/api/menfess"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-[90vh] px-5">
      <div className="flex justify-center mt-7 mb-4 items-center">
        <div>
          <h1 className="font-bold">TekkomFess</h1>
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            {data.length > 0 ? (
              data.map((item) => (
                <>
                  <div className="py-4 border-t-[1px]">
                    <Card key={item.id} item={item} />
                  </div>
                </>
              ))
            ) : (
              <>
                <SkeletonCardMenfess />
                <SkeletonCardMenfess />
                <SkeletonCardMenfess />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
