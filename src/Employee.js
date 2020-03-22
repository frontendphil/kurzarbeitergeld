import React from "react";

import {
  removeEmployee,
  updateEmployee,
  useDispatch,
  useEmployee,
  useEmployeeError
} from "./AppContext";
import Select from "./Select";
import TextInput from "./TextInput";

function Employee({ index, removable }) {
  const {
    name,
    insuranceNumber,
    taxClass,
    gender,
    hasChildren,
    lostHours,
    regularSalaryBeforeTax,
    regularSalaryAfterTax,
    currentSalaryBeforeTax,
    currentSalaryAfterTax
  } = useEmployee(index);
  const errors = useEmployeeError(index);
  const dispatch = useDispatch();

  return (
    <>
      <td className="p-2 border">
        <div className="flex justify-stretch">
          <div className="mr-4 flex-1">
            <TextInput
              label="Vor- und Nachname"
              value={name}
              error={errors.name}
              onComplete={name => dispatch(updateEmployee(index, "name", name))}
            />
          </div>

          <div className="flex-1">
            <TextInput
              label="Versicherungsnummer"
              hint="12 Zeichen"
              error={errors.insuranceNumber}
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
          value={gender}
          error={errors.gender}
          onChange={({ target }) =>
            dispatch(updateEmployee(index, "gender", target.value))
          }
        >
          <option value="">---</option>
          <option value="m">Männlich</option>
          <option value="w">Weiblich</option>
          <option disabled value="d">
            Divers
          </option>
        </Select>
      </td>

      <td className="p-2 border">
        <Select
          value={taxClass}
          error={errors.taxClass}
          onChange={({ target }) =>
            dispatch(updateEmployee(index, "taxClass", target.value))
          }
        >
          <option value="0">---</option>
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
          error={errors.lostHours}
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
            error={errors.regularSalaryBeforeTax}
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

        <TextInput
          disabled
          label="Leistungssatz"
          value={regularSalaryAfterTax ? `${regularSalaryAfterTax} €` : ""}
        />
      </td>
      <td className="p-2 border">
        <div className="mb-4">
          <TextInput
            label="Brutto"
            value={currentSalaryBeforeTax}
            error={errors.currentSalaryBeforeTax}
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

        <TextInput
          disabled
          label="Leistungssatz"
          value={currentSalaryAfterTax ? `${currentSalaryAfterTax} €` : ""}
        />
      </td>

      <td className="p-2 border">
        <button
          disabled={!removable}
          className={`bg-gray-300 text-gray-800 py-2 px-4 rounded inline-flex items-center ${
            removable ? "hover:bg-gray-400" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => dispatch(removeEmployee(index))}
        >
          Remove
        </button>
      </td>
    </>
  );
}

export default Employee;
