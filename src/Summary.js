import React, { useState } from "react";

import AddExampleData from "./AddExampleData";
import { useGeneralData } from "./AppContext";
import Card from "./Card";
import Link from "./Link";
import Submit from "./Submit";
import TextInput from "./TextInput";

const defaultLinks = { form: null, employeesList: null };

function Summary() {
  const general = useGeneralData();
  const [pdfLinks, setPDFLinks] = useState(defaultLinks);

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

      <div className="mt-8  flex justify-end">
        <div className="mr-4">
          <AddExampleData />
        </div>

        <div className="mr-4">
          <Submit
            beforeSubmit={() => setPDFLinks(defaultLinks)}
            onSuccess={([formBlob, employeesBlob]) => {
              const formObjectURL = URL.createObjectURL(formBlob);
              const employeesObjectURL = URL.createObjectURL(employeesBlob);
              setPDFLinks({
                form: formObjectURL,
                employeesList: employeesObjectURL
              });
            }}
          />
        </div>

        <div className="mr-4">
          <Link
            disabled={!pdfLinks.form}
            href={pdfLinks.form}
            target="_blank"
          rel="noreferrer noopener"
          >
            Antrag herunterladen
          </Link>
        </div>

        <Link
          disabled={!pdfLinks.employeesList}
          href={pdfLinks.employeesList}
          target="_blank"
          rel="noreferrer noopener"
        >
          Anhang herunterladen
        </Link>
      </div>
    </Card>
  );
}

export default Summary;
