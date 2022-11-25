import { Diagnosis, Entry } from "../types";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { BloodtypeRounded } from "@mui/icons-material";

const HealthCheckEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: {
    [code: string]: Diagnosis;
  };
}) => {
  if(entry.type ==="HealthCheck"){

  return(
    
    <>
      <Typography align="center" variant="body1">
        {" "}
        Admission Type : {entry.type}
        <BloodtypeRounded />
        <br></br>
        Date : {entry.date} <br></br>
        Description : {entry.description}
        <br></br>
        Health Check Rating: {entry.healthCheckRating}
        <br></br>
        Specialist : {entry.specialist} <br></br>
      
      
      {entry.diagnosisCodes?.map((codes) => (
        <List key={codes}>
          <ListItem>
            <ListItemText primary={`Dx codes: ${codes}-${diagnoses.codes?.name}`} />
          </ListItem>
          <Divider />
        </List>
      ))}
      </Typography>
      <Divider />

    </>
  );
      }
      return null;
    };
export default HealthCheckEntry;
