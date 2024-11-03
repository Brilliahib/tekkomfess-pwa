import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/atoms/card/CardMenfess";
import { Search } from "lucide-react";

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
    <div className="min-h-screen px-5">
      <div className="mt-7 flex justify-between md:mb-8 mb-4 items-center">
        <div>
          <h1 className="font-semibold">TekkomMenfess</h1>
        </div>
        <div>
          <div className="rounded-full p-2 bg-[#0288d1]/20">
            <Search className="w-5 h-5 text-[#0288d1]" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {data.length > 0 ? (
          data.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
