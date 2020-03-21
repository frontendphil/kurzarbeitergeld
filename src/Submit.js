import React from "react";

function Submit({ formData }) {
  return (
    <>
      <div className="m-8 w-4/5 flex justify-center">
        <button
          className="bg-blue-500 border-b-4 border-blue-700 hover:bg-blue-400 hover:border-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            const response = fetch(
              "https://kurzarbeitergeld.now.sh/api/createKug",
              {
                method: "POST",
                mode: "no-cors",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
              }
            );

            response.then(result => console.log(result));
          }}
        >
          Antrag erstellen
        </button>
      </div>
    </>
  );
}

export default Submit;