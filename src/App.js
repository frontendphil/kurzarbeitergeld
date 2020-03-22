import React, { useState } from "react";

import EmployeeData from "./EmployeeData";
import General from "./General";
import Submit from "./Submit";
import Summary from "./Summary";
import Title1 from "./Title1";

function App() {
  const [formData, setFormData] = useState({
    general: {},
    employees: []
  });
  const [pdfLink, setPDFLink] = useState(null);

  return (
    <div className="font-sans flex flex-col">
      <Title1>Antrag auf Kurzarbeitergeld</Title1>

      <General
        onStateChange={setFormData}
      />

      <EmployeeData onStateChange={setFormData} />

      <Summary formData={formData} />

      {
        pdfLink != null && <a href={pdfLink} download="antrag-kug.pdf">Download PDF</a>
      }
      <Submit formData={formData} onSuccess={ (pdfBlob) => {
        const objectURL = URL.createObjectURL(pdfBlob);
        setPDFLink(objectURL);
      }} />
    </div>
  );
}

export default App;
