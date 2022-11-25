import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';
import { Patients ,SafePatients,NewPatient, Id,EntryWithoutId} from '../types';



const patients : Array<Patients> = patientsData ;

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
const addEntries = (entry:EntryWithoutId,id :Id) => {
  const updatePatient: Patients | undefined = patients.find(patient => patient.id === id);
  const addEntry = {
    ...entry,
    id:uuidv4()
  };
  updatePatient?.entries.push(addEntry);
  return updatePatient;

};
  
  export default {
    getPatients,
    getSafePatients,
    addPatients,
    getPatient,
    addEntries
    
  };