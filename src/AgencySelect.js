import React, { useEffect, useRef, useState } from "react";
import Stick from "react-stick";

import TextInput from "./TextInput";

function AgencySelect({ value, onChange }) {
  const input = useRef();
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [selectionIndex, setSelectionIndex] = useState(-1);

  const agencies = useAgencies(query);

  useEffect(() => {
    if (!focus) {
      setSelectionIndex(-1);

      if (input.current) {
        input.current.blur();
      }
    }
  }, [focus]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Stick
        sameWidth
        node={
          focus && (
            <div className="bg-white border shadow overflow-y-auto h-64">
              {agencies.map((agency, index) => (
                <div
                  role="button"
                  key={`${agency.Bezeichnung}-${index}`}
                  className={`p-4 cursor-pointer hover:bg-gray-200 ${
                    selectionIndex === index ? "bg-gray-200" : ""
                  }`}
                  onMouseEnter={() => setSelectionIndex(index)}
                  onClick={() => {
                    onChange(agency);

                    setFocus(false);
                  }}
                >
                  {agency.Bezeichnung}
                </div>
              ))}
            </div>
          )
        }
        onClickOutside={() => setFocus(false)}
      >
        <TextInput
          ref={input}
          label="Jobcenter"
          placeholder="Suchen Sie nach PLZ oder Ort"
          value={focus || !value ? query : value.Bezeichnung}
          onChange={setQuery}
          onFocus={() => setFocus(true)}
          onKeyDown={event => {
            if (event.key === "ArrowDown") {
              setSelectionIndex(selectionIndex + 1);
            }

            if (event.key === "ArrowUp") {
              setSelectionIndex(selectionIndex - 1);
            }

            if (event.key === "Enter") {
              onChange(agencies[selectionIndex]);

              setFocus(false);
            }
          }}
        />
      </Stick>

      <TextInput
        disabled
        label="Adresse"
        value={value ? `${value.Anschrift} - ${value.PLZ} ${value.Ort}` : ""}
      />
    </div>
  );
}

const useAgencies = query => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(
      () =>
        fetch(`/api/agencies?filter=${query}`).then(async request => {
          const data = await request.json();

          if (!cancelled) {
            setAgencies(data.agencies[0]);
          }
        }),
      300
    );

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  return agencies;
};

export default AgencySelect;
