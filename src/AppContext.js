import React, { createContext, useContext, useReducer } from "react";

const defaultAppContext = {
  general: {
    name: "",
    bankName: "",
    iban: "",
    bic: "",
    email: "",
    city: ""
  },
  employees: []
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

export const updateEmployee = (index, employee) => ({
  type: "UPDATE_EMPLOYEE",
  payload: { index, employee }
});

export const addEmployee = employee => ({
  type: "ADD_EMPLOYEE",
  payload: { employee }
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
      const { index, employee } = action.payload;

      const employees = [
        ...state.employees.slice(0, index),
        employee,
        ...state.employees.slice(index + 1)
      ];

      return {
        ...state,

        employees
      };
    }

    case "ADD_EMPLOYEE": {
      const { employee } = action.payload;

      return {
        ...state,

        employees: [...state.employees, employee]
      };
    }

    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
};
