import React, { useState } from "react";

import {
  addEmployee,
  updateEmployee,
  useDispatch,
  useEmployeeData
} from "./AppContext";
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
  const dispatch = useDispatch();
  const employees = useEmployeeData();
  const [currentEmployee, setCurrentEmployee] = useState(defaultEmployee);

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
                onChange={changedEmployee =>
                  dispatch(updateEmployee(index, changedEmployee))
                }
              />
            </tr>
          ))}

          <tr className={employees.length % 2 !== 0 ? "bg-gray-100" : ""}>
            <Employee value={currentEmployee} onChange={setCurrentEmployee} />
          </tr>
        </tbody>
      </table>

      <div className="mt-8 mb-2 flex justify-end">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            dispatch(addEmployee(currentEmployee));

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
