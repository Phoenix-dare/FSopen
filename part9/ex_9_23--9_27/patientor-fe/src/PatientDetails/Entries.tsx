import { Diagnosis, Entry } from "../types";
import { useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue ,setDiagnoses } from "../state";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthCheckEntry from "./OccupationalHealthCheckEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Entries = ({ entry }: { entry: Entry }) : JSX.Element => {

  const [{diagnoses}, dispatch] = useStateValue();
  

  
    useEffect(() => {
      const getDiagnoses = async () => {
        try {
          const { data: diagnoses } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          );
          
         dispatch(setDiagnoses(diagnoses));
        } catch (e) {
          console.error(e);
        }
      };
      void getDiagnoses();
    }, []);



  switch (entry.type) {
    case "Hospital":
     return <HospitalEntry entry={entry} diagnoses = {diagnoses} />;

    case "OccupationalHealthcare":
     return <OccupationalHealthCheckEntry entry={entry} diagnoses = {diagnoses} />;
    
    case "HealthCheck":
     return <HealthCheckEntry entry={entry} diagnoses = {diagnoses} />;

          default:
      return assertNever(entry);
  }
};
export default Entries;
