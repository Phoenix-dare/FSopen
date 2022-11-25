export interface Diagnoses  {
    code:string,
    name:string,
    latin?:string
    
}
export enum Gender  {
    Male = "male",
    Female ="female",
    Others ="others",
    Unspecified ="not specified"
}

export interface Patients {
    id: string,
    name: string,
    dateOfBirth : string,
    ssn: string,
    gender:Gender,
    occupation:string
}
export type SafePatients = Omit <Patients, 'ssn'>;

export type NewPatient = Omit <Patients, 'id'>;

export type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, ssn: unknown , occupation:unknown };