import { Box, Divider, Paper, Typography } from "@material-ui/core";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Patient } from "../types";
import Entries from "./Entries";
import { useEffect, useState } from "react";

const PatientDetails = () => {
  const [details, setDetails] = useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const { data: patientDetails } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        setDetails(patientDetails);
      } catch (e) {
        console.error(e);
      }
    };
    void getDetails();
  }, []);

  return (
    <Box>
      {details && (
        <Paper>
          <Typography align="center" variant="h5">
            {" "}
            Patient Details{" "}
          </Typography>
          <Typography align="center" variant="h5">
            {" "}
            {details.name}{" "}
          </Typography>
          <Typography align="left" variant="body1">
            {" "}
            Date of birth : {details.dateOfBirth}
            <br></br>
            Gender : {details.gender} <br></br>
            Occupation : {details.occupation}
            <br></br>
          </Typography>
          <Typography align="center" variant="h6">
            <Divider  />
          Entries
            </Typography>


          {details.entries.map((entry) => (
            <Paper key={entry.id}>


              <Entries entry={entry} />
            </Paper>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default PatientDetails;
