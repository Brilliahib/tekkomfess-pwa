import React from "react";

const Card = ({ item }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 text-left">
      <p>{item.message}</p>
      {item.images && item.images.length > 0 && (
        <img src={item.images[0]} alt="post image" className="mt-2 rounded" />
      )}
    </div>
  );
};

export default Card;
