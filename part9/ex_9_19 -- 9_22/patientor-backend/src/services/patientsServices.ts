import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';
import { Patients ,SafePatients,NewPatient, Id} from '../types';



const patients : Array<Patients> = patientsData as Array<Patients>;

const getPatients = () => {
    return patients;
  };
const getSafePatients = () : SafePatients[] => {
  return patients.map (({id,name,dateOfBirth,gender,occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }
  ));

};
const getPatient = (id : Id) : SafePatients| undefined => {
  const ifExists = patients.find(patient => patient.id === id);
  return ifExists ? ifExists : undefined;

};
const addPatients = (patient: NewPatient) : Patients  =>{

  const id =uuidv4();
  const toPatientRecord = {
    id:id,
    entries:[],
    ...patient
  };
  patients.push(toPatientRecord);
  return toPatientRecord;


};
  
  
  export default {
    getPatients,
    getSafePatients,
    addPatients,
    getPatient
    
  };