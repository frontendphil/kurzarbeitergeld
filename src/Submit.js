import React from "react";

import {
  showErrors,
  useDispatch,
  useEmployeeData,
  useGeneralData,
  useHasErrors
} from "./AppContext";

function Submit({ onSuccess }) {
  const dispatch = useDispatch();
  const hasErrors = useHasErrors();

  const general = useGeneralData();
  const employees = useEmployeeData();

  return (
    <button
      className="bg-blue-500 border-b-4 border-blue-700 hover:bg-blue-400 hover:border-blue-500 text-white font-bold py-2 px-4 rounded"
      onClick={async () => {
        if (hasErrors) {
          dispatch(showErrors());

          return;
        }

        const formResponse = fetch(
          "https://kurzarbeitergeld.now.sh/api/createKugForm",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ general })
          }
        );

        const employeesResponse = fetch(
          "https://kurzarbeitergeld.now.sh/api/createKugEmployeesList",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ employees })
          }
        );

        const formBlob = formResponse.then((result) => result.blob());
        const employeesBlob = employeesResponse.then((result) => result.blob());

        Promise.all([formBlob, employeesBlob]).then(onSuccess);
      }}
    >
      Antrag erstellen
    </button>
  );
}

export default Submit;
