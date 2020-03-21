import React, { useState } from "react";

import EmployeeData from "./EmployeeData";
import General from "./General";
import Submit from "./Submit";
import Title1 from "./Title1";

function App() {
  const [formData, setFormData] = useState({
    general: {},
    employees: {}
  });

  return (
    <div className="font-sans flex flex-col">
      <Title1>Antrag auf Kurzarbeitergeld</Title1>

      <General
        onStateChange={general =>
          setFormData({
            ...formData,
            general
          })
        }
      />

      <EmployeeData onStateChange={setFormData} />

      <Submit formData={formData} />
    </div>
  );
}

export default App;
