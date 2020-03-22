import React, { useState } from "react";

import AddExampleData from "./AddExampleData";
import { Provider } from "./AppContext";
import EmployeeData from "./EmployeeData";
import General from "./General";
import Submit from "./Submit";
import Summary from "./Summary";
import Title1 from "./Title1";

function App() {
  const [pdfLink, setPDFLink] = useState(null);

  return (
    <Provider>
      <div className="font-sans flex flex-col">
        <Title1>Antrag auf Kurzarbeitergeld</Title1>

        <General />

        <EmployeeData />

        <Summary />

        {pdfLink != null && (
          <a href={pdfLink} download="antrag-kug.pdf">
            Download PDF
          </a>
        )}

        <div className="m-8 w-4/5 flex justify-center">
          <div className="mr-4">
            <AddExampleData />
          </div>

          <Submit
            onSuccess={pdfBlob => {
              const objectURL = URL.createObjectURL(pdfBlob);
              setPDFLink(objectURL);
            }}
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
