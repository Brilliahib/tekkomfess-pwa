import React from "react";

export default function SkeletonCardUser() {
  return (
    <div className="p-4 rounded-md shadow animate-pulse">
      <div className="flex gap-4 h-full items-center">
        <div className="h-10 w-12 bg-gray-300 rounded-full"></div>

        <div className="flex flex-col space-y-1 w-full">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
