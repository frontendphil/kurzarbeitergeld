import React, { createContext, useContext, useReducer } from "react";

import { calculateValueAfterTax } from "./calculateValueAfterTax";

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

export const useEmployeeError = index => {
  const [{ validationErrors, showErrors }] = useContext(AppContext);

  if (!showErrors) {
    return {};
  }

  return validationErrors.employees[index];
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
        employees: index === employees.length - 1 && value !== ""
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
        employees
      };
    }

    default: {
      return state;
    }
  }
};

const validationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXAMPLE_DATA": {
      const updatedValidationErrors = {
        ...state.validationErrors,

        general: getGeneralErrors(state.general),
        employees: state.employees.map((employee, index) =>
          index !== state.employees.length - 1
            ? getEmployeeErrors(employee)
            : {}
        )
      };

      return {
        ...state,

        hasValidationErrors: hasValidationErrors(updatedValidationErrors),

        validationErrors: updatedValidationErrors
      };
    }

    case SET_GENERAL_FIELD: {
      const updatedValidationErrors = {
        ...state.validationErrors,

        general: getGeneralErrors(state.general)
      };

      return {
        ...state,

        hasValidationErrors: hasValidationErrors(updatedValidationErrors),

        validationErrors: updatedValidationErrors
      };
    }

    case "UPDATE_EMPLOYEE": {
      const { index } = action.payload;

      const employee = state.employees[index];

      const updatedEmployeeErrors = [
        ...state.validationErrors.employees.slice(0, index),
        index !== state.employees.length - 1 ? getEmployeeErrors(employee) : {},
        ...state.validationErrors.employees.slice(index + 1)
      ];

      const updatedValidationErrors = {
        ...state.validationErrors,

        employees:
          state.validationErrors.employees.length !== state.employees.length
            ? [...updatedEmployeeErrors, {}]
            : updatedEmployeeErrors
      };

      return {
        ...state,

        hasValidationErrors: hasValidationErrors(updatedValidationErrors),

        validationErrors: updatedValidationErrors
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

const hasValidationErrors = ({ general, employees }) =>
  Object.keys(general).length > 0 ||
  employees.some(employee => Object.keys(employee).length > 0);

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
        },

        employees: [phil, daniel, peter, defaultEmployee]
      };
    }

    default: {
      return state;
    }
  }
};

const regularSalarySum = (employees) => {
  return employees.reduce((sum, { regularSalaryAfterTax }) => {
    if (regularSalaryAfterTax == null) {
      return sum;
    }

    if (regularSalaryAfterTax === "") {
      return sum;
    }

    return sum + parseFloat(regularSalaryAfterTax);
  }, 0);
};


const currentSalarySum = (employees) => {
  return employees.reduce((sum, { currentSalaryAfterTax }) => {
    if (currentSalaryAfterTax == null) {
      return sum;
    }

    if (currentSalaryAfterTax === "") {
      return sum;
    }

    return sum + parseFloat(currentSalaryAfterTax);
  }, 0);
};

const employeesWithGenderCount = (employees, genderString) => {
  return employees.filter(({ gender }) => gender === genderString).length
}
const maleEmployeesCount = (employees) => employeesWithGenderCount(employees, "m");
const femaleEmployeesCount = (employees) => employeesWithGenderCount(employees, "w");

const summaryReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_EMPLOYEE":
    case "REMOVE_EMPLOYEE":
    case "ADD_EXAMPLE_DATA": {
      const general = {
        ...state.general,
        regularSalarySum: regularSalarySum(state.employees),
        currentSalarySum: currentSalarySum(state.employees),
        employeesCount: state.employees.length - 1,
        maleEmployeesCount: maleEmployeesCount(state.employees),
        femaleEmployeesCount: femaleEmployeesCount(state.employees) 
      };
      return {
        ...state,
        general
      }
    }

    default: {
      return state;
    }
  }
};

const phil = {
  name: "Philipp Giese",
  insuranceNumber: "VD-123456789",
  taxClass: "3",
  gender: "m",
  hasChildren: true,
  lostHours: "20",
  regularSalaryBeforeTax: "3500",
  regularSalaryAfterTax: calculateValueAfterTax(3500, true, "3", false),
  currentSalaryBeforeTax: "1500",
  currentSalaryAfterTax: calculateValueAfterTax(1500, true, "3", false)
};

const daniel = {
  name: "Daniel Moritz",
  insuranceNumber: "VD-234567891",
  taxClass: "4",
  gender: "m",
  hasChildren: false,
  lostHours: "20",
  regularSalaryBeforeTax: "3200",
  regularSalaryAfterTax: calculateValueAfterTax(3200, false, "4", false),
  currentSalaryBeforeTax: "1300",
  currentSalaryAfterTax: calculateValueAfterTax(1300, false, "4", false)
};

const peter = {
  name: "Peter Retzlaff",
  insuranceNumber: "VD-345678912",
  taxClass: "1",
  gender: "m",
  hasChildren: false,
  lostHours: "20",
  regularSalaryBeforeTax: "4000",
  regularSalaryAfterTax: calculateValueAfterTax(4000, false, "1", false),
  currentSalaryBeforeTax: "1700",
  currentSalaryAfterTax: calculateValueAfterTax(1700, false, "1", false)
};

const REQUIRED_ERROR = "Bitte geben Sie einen Wert ein";

const compose = (...reducers) => (state, action) =>
  reducers.reduce((result, reducer) => reducer(result, action), state);

const appReducer = compose(dataReducer, exampleReducer, summaryReducer, validationReducer);

const mandatoryGeneralFields = [
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

  mandatoryGeneralFields.forEach(field => {
    if (general[field].trim() === "") {
      errors[field] = REQUIRED_ERROR;
    }
  });

  if (!general.agency) {
    errors.agency = "Bitte wählen Sie ein Jobcenter aus";
  }

  return errors;
};

const mandatoryEmployeeFields = [
  "name",
  "insuranceNumber",
  "gender",
  "lostHours",
  "regularSalaryBeforeTax",
  "currentSalaryBeforeTax"
];

const getEmployeeErrors = employee => {
  const errors = {};

  mandatoryEmployeeFields.forEach(field => {
    if (employee[field].trim() === "") {
      errors[field] = REQUIRED_ERROR;
    }
  });

  if (employee.taxClass === "0") {
    errors.taxClass = REQUIRED_ERROR;
  }

  return errors;
};

const defaultEmployee = {
  name: "",
  insuranceNumber: "",
  gender: "",
  taxClass: "0",
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
  employeesCount: 0,
  maleEmployeesCount: 0,
  femaleEmployeesCount: 0,
  regularSalarySum: 0,
  currentSalarySum: 0,

  agency: null,

  ...defaultBankData
};

const defaultAppContext = {
  general: defaultGeneral,
  employees: [defaultEmployee],

  hasValidationErrors: true,

  validationErrors: {
    general: getGeneralErrors(defaultGeneral),
    employees: [{}]
  }
};

const AppContext = createContext([
  defaultAppContext,
  () => {
    throw new Error("cannot dispatch outside provider.");
  }
]);
