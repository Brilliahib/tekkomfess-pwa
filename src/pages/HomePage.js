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
        const cache = await caches.open("api-cache");
        cache.put(
          "https://api-tekkomfess.vercel.app/api/menfess",
          new Response(JSON.stringify(response.data.data))
        );
      } catch (error) {
        console.error("Error fetching data: ", error);
        fetchDataFromCache();
      }
    };

    const fetchDataFromCache = async () => {
      const cache = await caches.open("api-cache");
      const cachedResponse = await cache.match(
        "https://api-tekkomfess.vercel.app/api/menfess"
      );
      if (cachedResponse) {
        const jsonData = await cachedResponse.json();
        setData(jsonData);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-[90vh] px-5">
      <div className="pt-7 rounded-b-xl flex justify-between md:mb-8 mb-6">
        <div>
          <p className="text-sm">Welcome to,</p>
          <p className="font-semibold">Tekkom Menfess</p>
        </div>
        <div>
          <div className="rounded-full p-2 bg-[#0288d1]/20">
            <Bell className="w-5 h-5 text-[#0288d1]" />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-6 rounded-xl bg-[#0288d1] text-white">
          <div className="space-y-2">
            <h1 className="font-bold text-xl flex gap-2">
              <TriangleAlert />
              App under development
            </h1>
            <p className="text-sm">
              If you find any bugs please report them to us. Don't forget to
              star our repository!
            </p>
          </div>
          <div></div>
        </div>
        <div className="space-y-4">
          <h1 className="font-semibold">Recently Menfess</h1>
          <div className="space-y-4">
            {data.length > 0 ? (
              data.map((item) => <Card key={item.id} item={item} />)
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
