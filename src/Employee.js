import React from "react";

import AfterTaxValue from "./AfterTaxValue";
import Select from "./Select";
import TextInput from "./TextInput";

function Employee({ value, onChange }) {
  return (
    <>
      <td className="p-2 border">
        <div className="flex justify-stretch">
          <div className="mr-4 flex-1">
            <TextInput
              label="Vor- und Nachname"
              value={value.name}
              onChange={name =>
                onChange({
                  ...value,

                  name
                })
              }
            />
          </div>

          <div className="flex-1">
            <TextInput
              label="Versicherungsnummer"
              value={value.insuranceNumber}
              onChange={insuranceNumber =>
                onChange({
                  ...value,

                  insuranceNumber
                })
              }
            />
          </div>
        </div>
      </td>
      <td className="p-2 border">
        <Select
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
        </Select>
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
          hasChildren={value.hasChildren}
          isNewState={false}
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
          hasChildren={value.hasChildren}
          isNewState={false}
        />
      </td>
    </>
  );
}

export default Employee;
