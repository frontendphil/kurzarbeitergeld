import React from "react";

function Card({ title, children }) {
  return (
    <div className="w-4/5 m-8 rounded overflow-hidden shadow-lg bg-white p-4">
      {title && <h2 className="mb-3 text-4xl">{title}</h2>}

      {children}
    </div>
  );
}

export default Card;
