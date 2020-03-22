import React, { useState } from "react";

import AddExampleData from "./AddExampleData";
import { Provider } from "./AppContext";
import EmployeeData from "./EmployeeData";
import General from "./General";
import Submit from "./Submit";
import Summary from "./Summary";
import Title1 from "./Title1";

const defaultLinks = {form: null, employeesList: null};

function App() {
  const [pdfLinks, setPDFLinks] = useState(defaultLinks);

  return (
    <Provider>
      <div className="font-sans flex flex-col">
        <Title1>Antrag auf Kurzarbeitergeld</Title1>

        <General />

        <EmployeeData />

        <Summary />

        {pdfLinks.form != null && pdfLinks.employeesList != null && (
          <div className="m-8 w-4/5 flex justify-center">
            <a className="mr-4 cursor-pointer bg-blue-500 border-b-4 border-blue-700 hover:bg-blue-400 hover:border-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                href={pdfLinks.form} download="antrag-kurzarbeitergeld.pdf">
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
              <span>Antrag herunterladen</span>
            </a>
            <a className="cursor-pointer bg-blue-500 border-b-4 border-blue-700 hover:bg-blue-400 hover:border-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                href={pdfLinks.employeesList} download="antrag-kurzarbeitergeld.pdf">
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
              <span>Anhang herunterladen</span>
            </a>
          </div>
        )}

        <div className="m-8 w-4/5 flex justify-center">
          <div className="mr-4">
            <AddExampleData />
          </div>

          <Submit
            beforeSubmit={() => setPDFLinks(defaultLinks)}
            onSuccess={(formBlob, employeesBlob) => {
              const formObjectURL = URL.createObjectURL(formBlob);
              const employeesObjectURL = URL.createObjectURL(employeesBlob);
              setPDFLinks({form: formObjectURL, employeesList: employeesObjectURL});
            }}
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
