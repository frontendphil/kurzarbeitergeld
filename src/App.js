import React from "react";

import { Provider } from "./AppContext";
import EmployeeData from "./EmployeeData";
import General from "./General";
import Summary from "./Summary";
import Title1 from "./Title1";

function App() {
  return (
    <Provider>
      <div className="font-sans flex flex-col">
        <Title1>Antrag auf Kurzarbeitergeld</Title1>

        <General />

        <EmployeeData />

        <Summary />
      </div>
    </Provider>
  );
}

export default App;
