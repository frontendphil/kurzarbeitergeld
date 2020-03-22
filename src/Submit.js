import React from "react";

import {
  showErrors,
  useDispatch,
  useEmployeeData,
  useGeneralData,
  useHasErrors
} from "./AppContext";

function Submit({ formData, onSuccess }) {
  const dispatch = useDispatch();
  const hasErrors = useHasErrors();

  const general = useGeneralData();
  const employees = useEmployeeData();

  return (
    <div className="m-8 w-4/5 flex justify-center">
      <button
        className="bg-blue-500 border-b-4 border-blue-700 hover:bg-blue-400 hover:border-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          if (hasErrors) {
            dispatch(showErrors());

            return;
          }

          const response = await fetch(
            "https://kurzarbeitergeld.now.sh/api/createKug",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ general, employees })
            }
          );

          const blob = await response.blob();

          onSuccess(blob);
        }}
      >
        Antrag erstellen
      </button>
    </div>
  );
}

export default Submit;
