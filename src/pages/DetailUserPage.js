import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TopNavigation from "../components/atoms/navbar/TopNavigation";
import SkeletonCardDetailUser from "../components/atoms/card/SkeletonCardDetailUser";
import { generateFallbackFromName } from "../utils/misc";
import Card from "../components/atoms/card/CardMenfess";

export default function DetailUserPage() {
  const [user, setUser] = useState(null);
  const [menfess, setMenfess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchUser(id);
      fetchMenfess(id);
    }
  }, [id]);

  const fetchUser = async (userId) => {
    setLoading(true);
    try {
      const userRes = await axios.get(
        `https://api-tekkomfess.vercel.app/api/users/${userId}`
      );
      setUser(userRes.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenfess = async (userId) => {
    setLoading(true);
    try {
      const menfessRes = await axios.get(
        `https://api-tekkomfess.vercel.app/api/users/${userId}/menfess`
      );
      setMenfess(menfessRes.data.data);
    } catch (err) {
      if (err.response && err.response.status !== 404) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] px-5">
      <TopNavigation title="Detail User" />
      {loading ? (
        <div>
          <SkeletonCardDetailUser />
          <SkeletonCardDetailUser />
        </div>
      ) : (
        <>
          {user ? (
            <div className="p-4 rounded-md shadow space-y-4">
              <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-muted">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f5f5f5] text-gray-700 text-sm font-semibold">
                  {generateFallbackFromName(user.fullname)}
                </div>
              </div>
              <div className="space-y-0">
                <p className="font-semibold">{user.fullname}</p>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          ) : (
            <p>User data not found</p>
          )}
          <div className="py-4">
            <h1 className="font-bold">Menfess</h1>
          </div>
          {menfess.length > 0 ? (
            <div>
              {menfess.map((menfessItem) => (
                <div className="py-4 border-t-[1px]">
                  <Card key={menfessItem.id} item={menfessItem} />
                </div>
              ))}
            </div>
          ) : (
            <p>Belum ada menfess</p>
          )}
        </>
      )}
    </div>
  );
}
