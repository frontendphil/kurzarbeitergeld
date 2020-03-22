import React from "react";

import { addExampleData, useDispatch } from "./AppContext";

function AddExampleData() {
  const dispatch = useDispatch();

  return (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      onClick={() => dispatch(addExampleData())}
    >
      Beispieldaten einfügen
    </button>
  );
}

export default AddExampleData;
