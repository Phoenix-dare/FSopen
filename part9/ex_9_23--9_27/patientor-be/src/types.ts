export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Male = "male",
  Female = "female",
  Others = "others",
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses["code"]>;
}
export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?:SickLeave;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type SafePatients = Omit<Patients, "ssn" | "entries">;

export type NewPatient = Omit<Patients, "id" | "entries">;

export type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  ssn: unknown;
  occupation: unknown;
  healthCheckRating: HealthCheckRating;
  employerName: string;


};

export type EntryFields = {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  occupation:unknown;
  diagnosisCodes: unknown;
  healthCheckRating:unknown;
  employerName:unknown;
  sickLeave : {
    startDate: unknown;
    endDate: unknown;
  }
  discharge: {
    date: unknown;
    criteria: unknown;
  };

};
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type Id = string;

export type Discharge = {
  criteria:string;
  date:string;
};

export type SickLeave = {
  startDate:string;
  endDate:string;
};
export type ParsedEntries = {
    type: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[]

};
