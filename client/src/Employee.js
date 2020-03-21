import React from "react";

import AfterTaxValue from "./AfterTaxValue";
import TextInput from "./TextInput";

function Employee({ value, onChange }) {
  return (
    <tr>
      <td className="p-2 border">
        <TextInput
          placeholder="Vor- und Nachname"
          value={value.name}
          onChange={name =>
            onChange({
              ...value,

              name
            })
          }
        />
      </td>
      <td className="p-2 border">
        <TextInput
          placeholder="Versicherungsnummer"
          value={value.insuranceNumber}
          onChange={insuranceNumber =>
            onChange({
              ...value,

              insuranceNumber
            })
          }
        />
      </td>
      <td className="p-2 border">
        <select
          className="block w-full border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
          value={value.taxClass}
          onChange={({ target }) =>
            onChange({
              ...value,

              taxClass: target.value
            })
          }
        >
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="3">III</option>
          <option value="4">IV</option>
          <option value="5">V</option>
          <option value="6">VI</option>
        </select>
      </td>
      <td className="p-2 border">
        <input
          type="checkbox"
          checked={value.hasChildren}
          onChange={({ target }) =>
            onChange({
              ...value,

              hasChildren: target.checked
            })
          }
        />
      </td>
      <td className="p-2 border">
        <TextInput
          placeholder="Anzahl Stunden"
          value={value.lostHours}
          onChange={lostHours =>
            onChange({
              ...value,

              lostHours
            })
          }
        />
      </td>
      <td className="p-2 border">
        <div className="mb-4">
          <TextInput
            label="Brutto"
            value={value.regularSalaryBeforeTax}
            onChange={regularSalaryBeforeTax =>
              onChange({
                ...value,

                regularSalaryBeforeTax
              })
            }
          />
        </div>

        <AfterTaxValue
          beforeTax={value.regularSalaryBeforeTax}
          taxClass={value.taxClass}
        />
      </td>
      <td className="p-2 border">
        <div className="mb-4">
          <TextInput
            label="Brutto"
            value={value.currentSalaryBeforeTax}
            onChange={currentSalaryBeforeTax =>
              onChange({
                ...value,

                currentSalaryBeforeTax
              })
            }
          />
        </div>

        <AfterTaxValue
          beforeTax={value.currentSalaryBeforeTax}
          taxClass={value.taxClass}
        />
      </td>
    </tr>
  );
}

export default Employee;
