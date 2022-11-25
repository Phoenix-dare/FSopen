import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients.json';
import { Patients ,SafePatients,NewPatient} from '../types';



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

const addPatients = (patient: NewPatient) : Patients  =>{

  const id =uuidv4();
  const toPatientRecord = {
    id:id,
    ...patient
  };
  patients.push(toPatientRecord);
  return toPatientRecord;


};
  
  
  export default {
    getPatients,
    getSafePatients,
    addPatients
    
  };