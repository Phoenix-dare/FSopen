import { Fields, Gender, NewPatient ,Id } from "./types";


const parseFields = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error('Incorrect or missing comment');
  }

  return field;
};
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
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
    throw new Error('Sorry invalid arguments for field gender');
  }
  return gender;
};

const toTyped = ({name,dateOfBirth,gender,ssn,occupation}: Fields): NewPatient => {
  const newPatient : NewPatient={
    name:parseFields(name),
    dateOfBirth:parseDate(dateOfBirth),
    gender:parseGender(gender),
    ssn:parseFields(ssn),
    occupation:parseFields(occupation)
    };

  return newPatient;
};

export const parseId = (id:unknown) :Id => {
  if(!id || !isString(id)) {
    throw new Error("Invalid Id");
  }
  return id;

};

export default toTyped;