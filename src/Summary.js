import React from "react";

import { useEmployeeData } from "./AppContext";
import Card from "./Card";
import TextInput from "./TextInput";

function Summary() {
  const employees = useEmployeeData();

  const regularSalary = employees.reduce((sum, { regularSalaryAfterTax }) => {
    if (regularSalaryAfterTax == null) {
      return sum;
    }

    if (regularSalaryAfterTax === "") {
      return sum;
    }

    return sum + parseFloat(regularSalaryAfterTax);
  }, 0);

  const currentSalary = employees.reduce((sum, { currentSalaryAfterTax }) => {
    if (currentSalaryAfterTax == null) {
      return sum;
    }

    if (currentSalaryAfterTax === "") {
      return sum;
    }

    return sum + parseFloat(currentSalaryAfterTax);
  }, 0);

  return (
    <Card title="Zusammenfassung">
      <div className="grid grid-cols-4 gap-4">
        <TextInput
          inline
          disabled
          label="Gesamtzahl der Beschäftigten"
          value={`${employees.length - 1}`}
        />

        <TextInput
          inline
          disabled
          label="Summe Soll"
          value={`${regularSalary} €`}
        />

        <TextInput
          inline
          disabled
          label="Summe Ist"
          value={`${currentSalary} €`}
        />
      </div>
    </Card>
  );
}

export default Summary;
