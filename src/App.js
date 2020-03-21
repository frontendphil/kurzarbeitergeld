import React from "react";

import EmployeeData from "./EmployeeData";
import General from "./General";

function App() {
  return (
    <div className="font-sans flex flex-col items-center">
      <h1 className="mb-8 text-5xl">Antrag auf Kurzarbeitergeld</h1>

      <General />
      <EmployeeData />
    </div>
  );
}

export default App;
