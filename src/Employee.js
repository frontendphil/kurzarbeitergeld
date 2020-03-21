import React, { useEffect } from "react";

import AfterTaxValue, { calculateValueAfterTax } from "./AfterTaxValue";
import Select from "./Select";
import TextInput from "./TextInput";

function Employee({ value, onChange, onStateChange }) {
  useEffect(() => {
    const currentSalaryAfterTax = calculateValueAfterTax(
      value.currentSalaryBeforeTax,
      value.hasChildren,
      value.taxClass,
      false
    );

    if (value.currentSalaryAfterTax !== currentSalaryAfterTax) {
      onChange({
        ...value,

        currentSalaryAfterTax: calculateValueAfterTax(
          value.currentSalaryBeforeTax,
          value.hasChildren,
          value.taxClass,
          false
        )
      });
    }
  }, [onChange, value]);

  return (
    <>
      <td className="p-2 border">
        <div className="flex justify-stretch">
          <div className="mr-4 flex-1">
            <TextInput
              label="Vor- und Nachname"
              value={value.name}
              onComplete={name =>
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
              onComplete={insuranceNumber =>
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
          onComplete={({ target }) => {
            const newState = {
              ...value,
              taxClass: target.value
            };
            onChange(newState);
          }}
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
          onComplete={lostHours =>
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
            onComplete={regularSalaryBeforeTax =>
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
            onComplete={currentSalaryBeforeTax =>
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
