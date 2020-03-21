import React, { useEffect, useState } from "react";

import Card from "./Card";
import Employee from "./Employee";

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

function EmployeeData({ onStateChange }) {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(defaultEmployee);

  useEffect(() => {
    onStateChange(currentState => ({
      ...currentState,
      employees
    }));
  }, [employees, onStateChange]);

  return (
    <Card title="Mitarbeiterdaten">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="p-4">Mitarbeiter</th>
            <th className="p-4">Steuerklasse</th>
            <th className="p-4">Kinder (Ja/Nein)</th>
            <th className="p-4">Anzahl der ausgefallenen Stunden</th>
            <th className="p-4">Soll-Entgelt</th>
            <th className="p-4">Ist-Entgelt</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className={index % 2 !== 0 ? "bg-gray-100" : ""}>
              <Employee
                value={employee}
                onChange={changedEmployee => {
                  setEmployees([
                    ...employees.slice(0, index),
                    changedEmployee,
                    ...employees.slice(index + 1)
                  ]);
                }}
              />
            </tr>
          ))}

          <tr className={employees.length % 2 !== 0 ? "bg-gray-100" : ""}>
            <Employee value={currentEmployee} onChange={setCurrentEmployee} />
          </tr>
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
  );
}

export default EmployeeData;
