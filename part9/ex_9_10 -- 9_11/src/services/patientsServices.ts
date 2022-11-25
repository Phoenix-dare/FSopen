import patientsData from '../../data/patients.json';
import { Patients ,SafePatients} from '../types';


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
  
  
  export default {
    getPatients,
    getSafePatients
    
  };