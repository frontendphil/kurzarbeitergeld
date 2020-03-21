import React, {useState} from "react";

import EmployeeData from "./EmployeeData";
import General from "./General";
import Submit from "./Submit";

function App() {
  const [formData, setFormData] = useState({
    general: {},
    employees: {}
  });
  return (
    <div className="font-sans flex flex-col items-center">
      <h1 className="mb-8 text-5xl">Antrag auf Kurzarbeitergeld</h1>

      <General onStateChange={(general) => setFormData({
        ...formData,
        general
      })}/>

      <EmployeeData onStateChange={(employees) => setFormData({
        ...formData,
        employees
      })}/>

      <Submit formData={formData}/>
    </div>
  );
}

export default App;
