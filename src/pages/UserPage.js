import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderTitle from "../components/atoms/typography/HeaderTitle";
import { generateFallbackFromName } from "../utils/misc";
import SkeletonCardUser from "../components/atoms/card/SkeletonCardUser";
import { Link } from "react-router-dom";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api-tekkomfess.vercel.app/api/users"
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-[90vh] px-5">
      <HeaderTitle title="Connect" />
      <div className="space-y-6">
        <div className="space-y-4">
          {loading ? (
            <>
              <SkeletonCardUser />
              <SkeletonCardUser />
              <SkeletonCardUser />
            </>
          ) : users.length > 0 ? (
            users.map((user) => (
              <div>
                <Link
                  key={user.id}
                  to={`/users/${user.id}`}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-md shadow">
                    <div className="flex gap-4 h-full items-center">
                      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-muted">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f5f5f5] text-gray-700 text-sm font-semibold">
                          {generateFallbackFromName(user.fullname)}
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <h2 className="font-bold text-sm">{user.fullname}</h2>
                        <p className="text-xs text-[#737373]">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
