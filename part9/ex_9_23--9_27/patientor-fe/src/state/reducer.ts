import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | { type: "ADD_ENTRY"; 
      payload: Entry;
      id:string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
        },
      };
      case "ADD_ENTRY":
        const entry = action.payload;
        const patientId = action.id;
        const patient : Patient = state.patients[patientId];
    
         const updatedPatient  = {
          ...patient,
          entries: patient.entries?.concat(entry),
        };
        return {
          ...state,
          patients: {
            [patient.id]: updatedPatient,
          },
        };

    default:
      return state;
  }
};
export const setPatientsList = (patients: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patients };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES", payload: diagnoses };
};
export const setEntry = (entryValues:Entry,id:string) : Action => {

  return { type: "ADD_ENTRY", payload: entryValues,id };
};
