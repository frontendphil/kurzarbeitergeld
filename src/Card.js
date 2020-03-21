import React from "react";

import Title2 from "./Title2";

function Card({ title, children }) {
  return (
    <div className="w-4/5 m-8 rounded overflow-hidden shadow-lg bg-white p-4">
      {title && <Title2>{title}</Title2>}

      {children}
    </div>
  );
}

export default Card;
