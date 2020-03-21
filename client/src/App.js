import React, { useState } from "react";

import Card from "./Card";
import Employee from "./Employee";
import General from "./General";

const defaultEmployee = {
  name: "",
  insuranceNumber: "",
  taxClass: 1,
  hasChildren: false,
  lostHours: "",
  regularSalaryBeforeTax: "",
  regularSalaryAfterTax: "",
  currentSalaryBeforeTax: "",
  currentSalaryAfterTax: ""
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(defaultEmployee);

  return (
    <div className="font-sans flex flex-col items-center">
      <h1 className="mb-8 text-5xl">Antrag auf Kurzarbeitergeld</h1>

      <Card title="Stammdaten">
        <General />
      </Card>

      <Card title="Mitarbeiterdaten">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="p-4">Name Mitarbeiter</th>
              <th className="p-4">Rentenversicherungsnummer</th>
              <th className="p-4">Steuerklasse</th>
              <th className="p-4">Kinder (Ja/Nein)</th>
              <th className="p-4">Anzahl der ausgefallenen Stunden</th>
              <th className="p-4">Soll-Entgelt</th>
              <th className="p-4">Ist-Entgelt</th>
              <th className="p-4">Soll-Entgelt (netto)</th>
              <th className="p-4">Ist-Entgelt (netto)</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <Employee
                key={index}
                value={employee}
                onChange={changedEmployee => {
                  setEmployees([
                    ...employees.slice(0, index),
                    changedEmployee,
                    ...employees.slice(index + 1)
                  ]);
                }}
              />
            ))}

            <Employee value={currentEmployee} onChange={setCurrentEmployee} />
          </tbody>
        </table>

        <div className="m-8 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setEmployees(currentEmployees => [
                ...currentEmployees,
                currentEmployee
              ]);

              setCurrentEmployee(defaultEmployee);
            }}
          >
            Zeile hinzufügen
          </button>
        </div>
      </Card>
    </div>
  );
}

export default App;
