import {
  Fields,
  Gender,
  NewPatient,
  Id,
  EntryFields,
  Diagnoses,
  Discharge,
  EntryWithoutId,
  HealthCheckRating,
  SickLeave,
  ParsedEntries
} from "./types";



const parseFields = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error("Incorrect or missing comment");
  }

  return field;
};
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Sorry invalid arguments for field gender");
  }
  return gender;
};

export const toTyped = ({
  name,
  dateOfBirth,
  gender,
  ssn,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseFields(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseFields(ssn),
    occupation: parseFields(occupation),
  };

  return newPatient;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ifArray = (arr: any): arr is Array<string> => {
  if (Array.isArray(arr)) {
    return arr.every((item: unknown) => isString(item));
  }
  return false;

};
const parseCodes = (codes: unknown): Array<Diagnoses["code"]> => {
  if (!codes || !ifArray(codes)) {
    throw new Error("Missing Codes");
  }

  return codes;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};
const parseRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || rating === null || !isRating(Number(rating))) {
    throw new Error("Values for rating invalid");
  }
  return Number(rating);
};

const isDischargeObj = (obj: unknown): boolean => {
  if (typeof obj === "object" && obj instanceof Object && obj !== null) {
    return Object.keys(obj).includes("criteria")
      &&
      Object.keys(obj).includes("date")

      &&
       Object.keys(obj).every(item => isString(item));


  }
  return false;
};
const isDischargeVal = (obj: unknown) => {
  if (!isDischargeObj(obj)) {
    throw new Error("Invalid entry in discharge");
  }
  return obj as Discharge;
};
const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischargeObj(discharge)) {
    throw new Error("Invalid entry in discharge fields");
  }
  const obj: Discharge = isDischargeVal(discharge);

  const parsed: Discharge = {
    date: parseDate(obj.date),
    criteria: parseFields(obj.criteria),

  };
  return parsed;

};
const isSickLeaveObj = (obj: unknown): boolean => {
  if (typeof obj === "object" && obj instanceof Object && obj !== null) {

    return Object.keys(obj).includes("startDate")
      && Object.keys(obj).includes("endDate")
      && Object.values(obj).every((item) => isString(item));

  }
  return false;
};

const isSickVal = (obj: unknown) => {
  if (!isSickLeaveObj(obj)) {
    throw new Error("Invalid entry in sick Leave");
  }
  return obj as SickLeave;
};

const parseSickLeave = (
  sickLeave: unknown
) => {
  if (!sickLeave || !isSickLeaveObj(sickLeave)) {
    throw new Error("Invalid entry in sick leave fields");
  }
  const obj = isSickVal(sickLeave);

  const parsed = {
    startDate: parseDate(obj.startDate),
    endDate: parseDate(obj.endDate),
  };
  return parsed;
};



const parseHospitalType = (
  entry: ParsedEntries,
  discharge: unknown
) => {

  const parsedDischarge = parseDischarge(discharge);

  const hospitalEntry = {
    ...entry,
    discharge: parsedDischarge
  };

  return hospitalEntry as EntryWithoutId;
};


const parseHospitalCheckType = (entry: ParsedEntries, rating: unknown) => {
  
  const healthCheck = {
    ...entry,

    healthCheckRating: parseRating(rating),
  };
  return healthCheck as EntryWithoutId;
};

const parseOccpationalType = (entry: ParsedEntries, name: unknown, sickLeave: unknown) => {
  const parsedSickLeave = parseSickLeave(sickLeave);
  
  const occpationalCheck = {
    employerName: parseFields(name),
    sickLeave: parsedSickLeave,
    ...entry,

  };
  return occpationalCheck as EntryWithoutId;
};
export const typedEntries = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  employerName,
  discharge,
  sickLeave,
  healthCheckRating,
}: EntryFields): EntryWithoutId => {

  const parsedEntry: ParsedEntries = {
    type: parseFields(type),
    description: parseFields(description),
    date: parseDate(date),
    specialist: parseFields(specialist),
    diagnosisCodes: parseCodes(diagnosisCodes),
  };
  switch (type) {
    case "Hospital":
      const hospitalType = parseHospitalType(parsedEntry, discharge);
      return hospitalType;

    case "OccupationalHealthcare":
      const occpationalType = parseOccpationalType(parsedEntry, employerName, sickLeave);
      return occpationalType;

    case "HealthCheck":
      const hospitalCheckEntry = parseHospitalCheckType(parsedEntry, healthCheckRating);
      return hospitalCheckEntry;
    default:
      throw new Error(
        "Cannot handle value of unknown type"
      );
  }
};

export const parseId = (id: unknown): Id => {
  if (!id || !isString(id)) {
    throw new Error("Invalid Id");
  }
  return id;
};


