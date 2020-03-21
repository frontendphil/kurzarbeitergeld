import React from "react";

import Netto from "./Netto";
import TextInput from "./TextInput";
import AfterTaxValue from "./AfterTaxValue";

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
        <div className="flex">
          <TextInput
            placeholder="Brutto"
            value={value.regularSalaryBeforeTax}
            onChange={regularSalaryBeforeTax =>
              onChange({
                ...value,

                regularSalaryBeforeTax
              })
            }
          />

          <TextInput
            placeholder="Netto"
            value={value.regularSalaryAfterTax}
            onChange={regularSalaryAfterTax =>
              onChange({
                ...value,

                regularSalaryAfterTax
              })
            }
          />
        </div>
      </td>
      <td className="p-2 border">
        <div className="flex">
          <TextInput
            placeholder="Brutto"
            value={value.currentSalaryBeforeTax}
            onChange={currentSalaryBeforeTax =>
              onChange({
                ...value,

                currentSalaryBeforeTax
              })
            }
          />

          <TextInput
            placeholder="Netto"
            value={value.currentSalaryAfterTax}
            onChange={currentSalaryAfterTax =>
              onChange({
                ...value,

                currentSalaryAfterTax
              })
            }
          />
        </div>
      </td>
      <td className="p-2 border">
        <AfterTaxValue beforeTax={value.regularSalary} category={1} taxClass={value.taxClass}></AfterTaxValue>
      </td>
      <td className="p-2 border">
        <AfterTaxValue beforeTax={value.currentSalary} category={1} taxClass={value.taxClass}></AfterTaxValue>
      </td>
    </tr>
  );
}

export default Employee;
