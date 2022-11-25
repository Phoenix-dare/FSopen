import { Diagnosis, Entry } from "../types";
import { Typography,List,ListItem,ListItemText,Divider,Box} from "@material-ui/core";
import MasksIcon from '@mui/icons-material/Masks';


const OccupationalHealthCheckEntry = ({entry,diagnoses}:{entry:Entry,diagnoses:{
    [code: string]: Diagnosis;
}}) =>{
  if(entry.type ==="OccupationalHealthcare"){

  return(
   
    <Box>
    <Typography align="center" variant="body1">
      {" "}
      Admission Type : {entry.type}
      <MasksIcon />
      <br></br>
      Date : {entry.date} <br></br>
      Description : {entry.description}
      <br></br>
      Employer Name : {entry.employerName}
      <br></br>
      Specialist : {entry.specialist} <br></br>
      Sick Leave :{" "}
      {entry.sickLeave
        ? `From: ${entry.sickLeave.startDate} - To: ${entry.sickLeave.endDate}`
        : "NA"}
        </Typography>
  
    <Divider variant="fullWidth"  />

  
            
    {entry.diagnosisCodes?.map((codes) => 
                     
   <List key ={codes}>
     <ListItem>
<ListItemText primary={`DX codes ${codes}-${diagnoses[codes]?.name}`}/>
     </ListItem>
     <Divider />
     </List>
     )}
     
     
      <Divider />
            </Box>  

  );
    }
    return null;
  };
export default OccupationalHealthCheckEntry;