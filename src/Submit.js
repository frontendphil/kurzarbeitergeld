import React, { useState } from "react";

import {
  showErrors,
  useDispatch,
  useEmployeeData,
  useGeneralData,
  useHasErrors
} from "./AppContext";

function Submit({ onSuccess, beforeSubmit }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const hasErrors = useHasErrors();

  const general = useGeneralData();
  const employees = useEmployeeData();

  return (
    <button
      disabled={loading}
      className={`bg-blue-500 border-blue-700 ${
        loading
          ? "opacity-50 cursor-wait"
          : "hover:bg-blue-400 hover:border-blue-500"
      } text-white font-bold py-2 px-4 rounded`}
      onClick={async () => {
        if (hasErrors) {
          dispatch(showErrors());

          return;
        }

        if (beforeSubmit != null) {
          beforeSubmit();
        }
        setLoading(true);

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
            body: JSON.stringify({ employees: employees.slice(0, -1) })
          }
        );

        const formBlob = formResponse.then(result => result.blob());
        const employeesBlob = employeesResponse.then(result => result.blob());

        Promise.all([formBlob, employeesBlob]).then((...data) => {
          setLoading(false);

          onSuccess(...data);
        });
      }}
    >
      {loading ? "Antrag wird erstellt..." : "Antrag erstellen"}
    </button>
  );
}

export default Submit;
