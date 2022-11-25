export interface Diagnoses  {
    code:string,
    name:string,
    latin?:string
    
}
export type Gender = "male" | "female" | "others" | "not specified";

export interface Patients {
    id: string,
    name: string,
    dateOfBirth : string,
    ssn: string,
    gender:Gender,
    occupation:string
}
export type SafePatients = Omit <Patients, 'ssn'>;