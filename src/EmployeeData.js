import React from "react";

import { useEmployeeData } from "./AppContext";
import Card from "./Card";
import Employee from "./Employee";

function EmployeeData() {
  const employees = useEmployeeData();

  return (
    <Card title="Mitarbeiterdaten">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="p-4">Mitarbeiter</th>
            <th className="p-4">Geschlecht</th>
            <th className="p-4">Steuerklasse</th>
            <th className="p-4">Kinder (Ja/Nein)</th>
            <th className="p-4">Anzahl der ausgefallenen Stunden</th>
            <th className="p-4">Soll-Entgelt</th>
            <th className="p-4">Ist-Entgelt</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className={index % 2 !== 0 ? "bg-gray-100" : ""}>
              <Employee
                index={index}
                removable={
                  employees.length > 1 && index !== employees.length - 1
                }
              />
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default EmployeeData;
