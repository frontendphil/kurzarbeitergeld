import "./App.css";

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
    <div className="App">
      <h1>Antrag!</h1>

      <table>
        <thead>
          <tr>
            <th>Name Mitarbeiter</th>
            <th>Rentenversicherungsnummer</th>
            <th>Steuerklasse</th>
            <th>Kinder (Ja/Nein)</th>
            <th>Anzahl der ausgefallenen Stunden</th>
            <th>Soll-Entgeld</th>
            <th>Ist-Entgeld</th>
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

      <button
        onClick={() => {
          setEmployees(currentEmployees => [
            ...currentEmployees,
            currentEmployee
          ]);

          setCurrentEmployee(defaultEmployee);
        }}
      >
        Mitarbeiter hinzufügen
      </button>
    </div>
  );
}

export default App;
