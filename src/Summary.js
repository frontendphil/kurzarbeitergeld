import React from "react";

import { useGeneralData } from "./AppContext";
import Card from "./Card";
import TextInput from "./TextInput";

function Summary() {
  const general = useGeneralData();

  return (
    <Card title="Zusammenfassung">
      <div className="grid grid-cols-4 gap-4">
        <TextInput
          inline="true"
          disabled
          label="Gesamtzahl der Beschäftigten"
          value={`${general.employeesCount}`}
        />

        <TextInput
          inline="true"
          disabled
          label="Summe Soll"
          value={`${general.regularSalarySum} €`}
        />

        <TextInput
          inline="true"
          disabled
          label="Summe Ist"
          value={`${general.currentSalarySum} €`}
        />
      </div>
    </Card>
  );
}

export default Summary;
