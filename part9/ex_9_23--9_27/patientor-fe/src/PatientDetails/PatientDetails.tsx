import {
  Box,
  Divider,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@material-ui/core";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EntryFields, Entry, Patient } from "../types";
import Entries from "./Entries";
import { useEffect, useState } from "react";
import AddEntriesForm from "./EntriesForm";
import React from "react";
import { setEntry, useStateValue } from "../state";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit: (values: EntryFields) => void;
  error?: string;
}

const AddEntriesModal = ({ modalOpen, onClose, onSubmit }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      <AddEntriesForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

const PatientDetails = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const [details, setDetails] = useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const parseId = (id: unknown): string => {
    if ((!id && typeof id === "string") || id instanceof String) {
      throw new Error("Id cannot be undefined");
    }
    return id as string;
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        const { data: patientDetails } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        setDetails(patientDetails);
      } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (axios.isAxiosError(error) && error.response) {
          console.error(error.response.data);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errorMessage = error.response.data.error;
        }
        setError(errorMessage);
      }
    };
    void getDetails();
  }, [patients]);

  const submitEntries = async (values: EntryFields) => {
    let toValues;

    if (values.type === "Hospital") {
      toValues = {
        type: values.type,
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        discharge: {
          date: values.dischargeDate,
          criteria: values.dischargeCriteria,
        },
      };
    } else if (values.type === "OccupationalHealthcare") {
      toValues = {
        type: values.type,
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,

        employerName: values.employerName,
        sickLeave: {
          startDate: values.sickLeaveStartDate,
          endDate: values.sickLeaveEndDate,
        },
      };
    } else if (values.type === "HealthCheck") {
      toValues = {
        type: values.type,
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        healthCheckRating: values.healthCheckRating,
      };
    } else {
      toValues = values;
    }

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${parseId(id)}/entries`,
        toValues
      );
      dispatch(setEntry(newEntry, parseId(id)));
      closeModal();
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errorMessage = error.response.data.error;
      }
      setError(errorMessage);
    }
  };

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
            <Divider />
            Entries
          </Typography>

          {details.entries.map((entry) => (
            <Paper key={entry.id}>
              <Entries entry={entry} />
            </Paper>
          ))}
        </Paper>
      )}
      <AddEntriesModal
        modalOpen={modalOpen}
        onSubmit={submitEntries}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add Entry
      </Button>
    </Box>
  );
};

export default PatientDetails;
