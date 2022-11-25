import { Diagnosis, Entry } from "../types";
import { Box,Typography,List,ListItem,ListItemText,Divider } from "@material-ui/core";
import VaccinesIcon from '@mui/icons-material/Vaccines';

const HospitalEntry  = ({entry,diagnoses}:{entry:Entry,diagnoses:{
    [code: string]: Diagnosis;
}})  =>{
  if(entry.type ==="Hospital"){

  return(
    <Box>
    <Typography align="center" variant="body1">
      {" "}
      Admission Type : {entry.type}
      <VaccinesIcon />
      <br></br>
      Date : {entry.date} <br></br>
      Description : {entry.description}
      <br></br>
      Discharge info : {entry.discharge.criteria}
      <br></br>
      {entry.discharge.date}
      Specialist : {entry.specialist} <br></br>
            
      </Typography>      

            
            
{entry.diagnosisCodes?.map((codes) => 
              
<List key ={codes}>
<ListItem>
<ListItemText primary={`Dx codes : ${codes}-${diagnoses[codes]?.name}`}/>
</ListItem>
</List>

)}
<Divider />
   </Box> 
);
}
return null;
};
export default HospitalEntry;