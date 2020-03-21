import React from "react";

function Employee({ value, onChange }) {
  return (
    <tr>
      <td>
        <input
          type="text"
          value={value.name}
          onChange={({ target }) =>
            onChange({
              ...value,

              name: target.value
            })
          }
        />
      </td>
      <td>
        <input
          type="text"
          value={value.insuranceNumber}
          onChange={({ target }) =>
            onChange({
              ...value,

              insuranceNumber: target.value
            })
          }
        />
      </td>
      <td>
        <select
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
      <td>
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
      <td>
        <input
          type="text"
          value={value.lostHours}
          onChange={({ target }) =>
            onChange({
              ...value,

              lostHours: target.value
            })
          }
        />
      </td>
      <td>
        <input
          type="text"
          value={value.regularSalary}
          onChange={({ target }) =>
            onChange({
              ...value,

              regularSalary: target.value
            })
          }
        />
      </td>
      <td>
        <input
          type="text"
          value={value.currentSalary}
          onChange={({ target }) =>
            onChange({
              ...value,

              currentSalary: target.value
            })
          }
        />
      </td>
    </tr>
  );
}

export default Employee;
