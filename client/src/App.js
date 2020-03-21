import React, { useState } from "react";

import Employee from "./Employee";

const defaultEmployee = {
  name: "",
  insuranceNumber: "",
  taxClass: "",
  hasChildren: false,
  lostHours: 0,
  regularSalary: 0,
  currentSalary: 0
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(defaultEmployee);

  return (
    <div className="font-sans flex flex-col items-center">
      <h1 className="m-8 text-5xl">Antrag auf Kurzarbeitergeld</h1>

      <div className="rounded overflow-hidden shadow-lg bg-white p-4">
        <table class="table-auto">
          <thead>
            <tr>
              <th className="p-4">Name Mitarbeiter</th>
              <th className="p-4">Rentenversicherungsnummer</th>
              <th className="p-4">Steuerklasse</th>
              <th className="p-4">Kinder (Ja/Nein)</th>
              <th className="p-4">Anzahl der ausgefallenen Stunden</th>
              <th className="p-4">Soll-Entgeld</th>
              <th className="p-4">Ist-Entgeld</th>
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
      </div>
    </div>
  );
}

export default App;
