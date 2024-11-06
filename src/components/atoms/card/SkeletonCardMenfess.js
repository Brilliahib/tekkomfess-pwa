import React from "react";

const SkeletonCardMenfess = () => {
  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 mb-4 text-left space-y-2 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-muted bg-gray-200"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonCardMenfess;
