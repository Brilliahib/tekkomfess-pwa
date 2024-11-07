import React from "react";

const SkeletonCardMenfess = () => {
  return (
    <>
      <div className="animate-pulse py-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-muted bg-gray-200"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 w-10 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonCardMenfess;
