import React, { createContext, useContext, useReducer } from "react";

import { calculateValueAfterTax } from "./AfterTaxValue";

const defaultEmployee = {
  name: "",
  insuranceNumber: "",
  taxClass: 1,
  hasChildren: false,
  lostHours: "",
  regularSalaryBeforeTax: "",
  regularSalaryAfterTax: "",
  currentSalaryBeforeTax: "",
  currentSalaryAfterTax: ""
};

const defaultAppContext = {
  general: {
    name: "",
    bankName: "",
    iban: "",
    bic: "",
    email: "",
    city: ""
  },
  employees: [defaultEmployee]
};

const AppContext = createContext([
  defaultAppContext,
  () => {
    throw new Error("cannot dispatch outside provider.");
  }
]);

export const useGeneralData = () => {
  const [{ general }] = useContext(AppContext);

  return general;
};

export const useEmployeeData = () => {
  const [{ employees }] = useContext(AppContext);

  return employees;
};

export const useEmployee = index => {
  const employees = useEmployeeData();

  return employees[index];
};

export const useDispatch = () => {
  const [, dispatch] = useContext(AppContext);

  return dispatch;
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, defaultAppContext);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export const updateGeneralField = (field, value) => ({
  type: "SET_GENERAL_FIELD",
  payload: {
    field,
    value
  }
});

export const updateBankDetails = bankDetails => ({
  type: "UPDATE_BANK_DETAILS",
  payload: { bankDetails }
});

export const updateEmployee = (index, field, value) => ({
  type: "UPDATE_EMPLOYEE",
  payload: { index, field, value }
});

export const removeEmployee = (index) => ({
  type: "REMOVE_EMPLOYEE",
  payload: { index }
});

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_GENERAL_FIELD": {
      const { field, value } = action.payload;

      return {
        ...state,

        general: {
          ...state.general,
          [field]: value
        }
      };
    }

    case "UPDATE_BANK_DETAILS": {
      const { bankDetails } = action.payload;

      return {
        ...state,

        general: {
          ...state.general,
          ...bankDetails
        }
      };
    }

    case "UPDATE_EMPLOYEE": {
      const { index, field, value } = action.payload;

      const employee = state.employees[index];

      let updatedEmployee = {
        ...employee,

        [field]: value
      };

      if (field === "currentSalaryBeforeTax") {
        updatedEmployee = {
          ...updatedEmployee,

          currentSalaryAfterTax: calculateValueAfterTax(
            value,
            employee.hasChildren,
            employee.taxClass,
            false
          )
        };
      }

      if (field === "regularSalaryBeforeTax") {
        updatedEmployee = {
          ...updatedEmployee,

          regularSalaryAfterTax: calculateValueAfterTax(
            value,
            employee.hasChildren,
            employee.taxClass,
            false
          )
        };
      }

      if (field === "taxClass" || field === "hasChildren") {
        updatedEmployee = {
          ...updatedEmployee,

          currentSalaryAfterTax: calculateValueAfterTax(
            employee.currentSalaryBeforeTax,
            employee.hasChildren,
            employee.taxClass,
            false
          ),
          regularSalaryAfterTax: calculateValueAfterTax(
            employee.regularSalaryBeforeTax,
            employee.hasChildren,
            employee.taxClass,
            false
          )
        };
      }

      const employees = [
        ...state.employees.slice(0, index),
        updatedEmployee,
        ...state.employees.slice(index + 1)
      ];

      return {
        ...state,

        employees:
          index === employees.length - 1 && value !== ""
            ? [...employees, defaultEmployee]
            : employees
      };
    }

    case "REMOVE_EMPLOYEE": {
      const { index } = action.payload;
      const employees = [
        ...state.employees.slice(0, index),
        ...state.employees.slice(index + 1)
      ]
      
      return {
        ...state,
        employees: employees 
      }
    }

    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
};
