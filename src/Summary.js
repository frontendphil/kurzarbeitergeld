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

    return sum + parseInt(regularSalaryAfterTax, 10);
  }, 0);

  const currentSalary = employees.reduce((sum, { currentSalaryAfterTax }) => {
    if (currentSalaryAfterTax == null) {
      return sum;
    }

    if (currentSalaryAfterTax === "") {
      return sum;
    }

    return sum + parseInt(currentSalaryAfterTax, 10);
  }, 0);

  return (
    <Card title="Zusammenfassung">
      <div className="mb-4">
        <TextInput
          inline
          disabled
          label="Summe Soll"
          value={`${regularSalary} €`}
        />
      </div>

      <TextInput
        inline
        disabled
        label="Summe Ist"
        value={`${currentSalary} €`}
      />
    </Card>
  );
}

export default Summary;
