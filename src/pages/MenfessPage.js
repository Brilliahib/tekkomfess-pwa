import { useEffect, useState } from "react";
import axios from "axios";
import HeaderTitle from "../components/atoms/typography/HeaderTitle";
import SkeletonCardMenfess from "../components/atoms/card/SkeletonCardMenfess";
import Card from "../components/atoms/card/CardMenfess";

export default function MenfessPage() {
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
    <>
      <div className="px-5 min-h-[80vh]">
        <HeaderTitle title="Menfess" subtitle="Find unique stories in here" />
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
    </>
  );
}
