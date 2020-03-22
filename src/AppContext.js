import React, { createContext, useContext, useReducer } from "react";

import { calculateValueAfterTax } from "./AfterTaxValue";

export const useGeneralData = () => {
  const [{ general }] = useContext(AppContext);

  return general;
};

export const useGeneralErrors = () => {
  const [{ validationErrors, showErrors }] = useContext(AppContext);

  if (!showErrors) {
    return {};
  }

  return validationErrors.general;
};

export const useHasErrors = () => {
  const [{ hasValidationErrors }] = useContext(AppContext);

  return hasValidationErrors;
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

const SET_GENERAL_FIELD = "SET_GENERAL_FIELD";

export const updateGeneralField = (field, value) => ({
  type: SET_GENERAL_FIELD,
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

export const removeEmployee = index => ({
  type: "REMOVE_EMPLOYEE",
  payload: { index }
});

export const showErrors = () => ({
  type: "SHOW_ERRORS"
});

export const resetBankData = () => ({
  type: "RESET_BANK_DATA"
});

export const addExampleData = () => ({
  type: "ADD_EXAMPLE_DATA"
});

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_GENERAL_FIELD: {
      const { field, value } = action.payload;

      return {
        ...state,

        general: {
          ...state.general,
          [field]: value
        }
      };
    }

    case "RESET_BANK_DATA": {
      return {
        ...state,

        general: {
          ...state.general,

          ...defaultBankData
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
      ];

      return {
        ...state,
        employees: employees
      };
    }

    default: {
      return state;
    }
  }
};

const validationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXAMPLE_DATA":
    case SET_GENERAL_FIELD: {
      const general = getGeneralErrors(state.general);

      return {
        ...state,

        hasValidationErrors: Object.keys(general).length > 0,

        validationErrors: {
          ...state.validationErrors,

          general
        }
      };
    }

    case "SHOW_ERRORS": {
      return {
        ...state,

        showErrors: true,

        validationErrors: {
          ...state.validationErrors
        }
      };
    }

    default: {
      return state;
    }
  }
};

const exampleReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXAMPLE_DATA": {
      return {
        ...state,

        general: {
          ...defaultGeneral,

          name: "ACME",
          streetName: "Karl-Liebknecht Straße",
          streetNumber: "42",
          zipCode: "14462",
          city: "Potsdam",
          phone: "0331 / 123456",
          email: "karl.liebknecht@spd.de",

          iban: "DE12500105170648489890",
          bic: "INGDDEFFXXX",
          bankName: "ING-DiBa",

          agency: {
            Bezeichnung: "Jobcenter Stadt Ansbach",
            "AA Bezirk": "Ansbach",
            Anschrift: "Schalkhäuser Str. 40",
            PLZ: "91522",
            Ort: "Ansbach"
          }
        }
      };
    }

    default: {
      return state;
    }
  }
};

const REQUIRED_ERROR = "Bitte geben Sie einen Wert ein";

const compose = (...reducers) => (state, action) =>
  reducers.reduce((result, reducer) => reducer(result, action), state);

const appReducer = compose(dataReducer, exampleReducer, validationReducer);

const mandatoryFields = [
  "name",
  "streetName",
  "streetNumber",
  "zipCode",
  "city",
  "phone",
  "iban"
];

const getGeneralErrors = general => {
  const errors = {};

  mandatoryFields.forEach(field => {
    if (general[field].trim() === "") {
      errors[field] = REQUIRED_ERROR;
    }
  });

  if (!general.agency) {
    errors.agency = "Bitte wählen Sie ein Jobcenter aus";
  }

  return errors;
};

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

const defaultBankData = { iban: "", bankName: "", bic: "" };

const defaultGeneral = {
  name: "",
  streetName: "",
  streetNumber: "",
  zipCode: "",
  phone: "",
  fax: "",
  email: "",
  city: "",

  agency: null,

  ...defaultBankData
};

const defaultAppContext = {
  general: defaultGeneral,
  employees: [defaultEmployee],

  hasValidationErrors: true,

  validationErrors: {
    general: getGeneralErrors(defaultGeneral)
  }
};

const AppContext = createContext([
  defaultAppContext,
  () => {
    throw new Error("cannot dispatch outside provider.");
  }
]);
