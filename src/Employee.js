import React from "react";

import AfterTaxValue from "./AfterTaxValue";
import { updateEmployee, useDispatch, useEmployee } from "./AppContext";
import Select from "./Select";
import TextInput from "./TextInput";

function Employee({ index }) {
  const {
    name,
    insuranceNumber,
    taxClass,
    hasChildren,
    lostHours,
    regularSalaryBeforeTax,
    currentSalaryBeforeTax
  } = useEmployee(index);
  const dispatch = useDispatch();

  return (
    <>
      <td className="p-2 border">
        <div className="flex justify-stretch">
          <div className="mr-4 flex-1">
            <TextInput
              label="Vor- und Nachname"
              value={name}
              onComplete={name => dispatch(updateEmployee(index, "name", name))}
            />
          </div>

          <div className="flex-1">
            <TextInput
              label="Versicherungsnummer"
              value={insuranceNumber}
              onComplete={insuranceNumber =>
                dispatch(
                  updateEmployee(index, "insuranceNumber", insuranceNumber)
                )
              }
            />
          </div>
        </div>
      </td>
      <td className="p-2 border">
        <Select
          value={taxClass}
          onChange={({ target }) =>
            dispatch(updateEmployee(index, "taxClass", target.value))
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
          checked={hasChildren}
          onChange={({ target }) =>
            dispatch(updateEmployee(index, "hasChildren", target.checked))
          }
        />
      </td>
      <td className="p-2 border">
        <TextInput
          placeholder="Anzahl Stunden"
          value={lostHours}
          onComplete={lostHours =>
            dispatch(updateEmployee(index, "lostHours", lostHours))
          }
        />
      </td>
      <td className="p-2 border">
        <div className="mb-4">
          <TextInput
            label="Brutto"
            value={regularSalaryBeforeTax}
            onComplete={regularSalaryBeforeTax =>
              dispatch(
                updateEmployee(
                  index,
                  "regularSalaryBeforeTax",
                  regularSalaryBeforeTax
                )
              )
            }
          />
        </div>

        <AfterTaxValue
          beforeTax={regularSalaryBeforeTax}
          taxClass={taxClass}
          hasChildren={hasChildren}
          isNewState={false}
        />
      </td>
      <td className="p-2 border">
        <div className="mb-4">
          <TextInput
            label="Brutto"
            value={currentSalaryBeforeTax}
            onComplete={currentSalaryBeforeTax =>
              dispatch(
                updateEmployee(
                  index,
                  "currentSalaryBeforeTax",
                  currentSalaryBeforeTax
                )
              )
            }
          />
        </div>

        <AfterTaxValue
          beforeTax={currentSalaryBeforeTax}
          taxClass={taxClass}
          hasChildren={hasChildren}
          isNewState={false}
        />
      </td>
    </>
  );
}

export default Employee;
