import express from "express";
import patientsServices from "../services/patientsServices";
import { NewPatient } from "../types";
import {toTyped ,parseId,typedEntries}from "../utilis";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).send(patientsServices.getSafePatients());
});


router.get("/:id", (req, res) => {
  const id = parseId(req.params.id);
  const patient = patientsServices.getPatient(id);
  patient ? res.status(200).send(patient) : res.status(404).json({message: 'not found'});
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const typedPatient : NewPatient = toTyped(req.body);
    const newPatient = patientsServices.addPatients(typedPatient);
    res.status(200).send(newPatient);

  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


router.post("/:id/entries", (req, res) => {

  try {
    const id = parseId(req.params.id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entries  = typedEntries(req.body);
    const newEntry = patientsServices.addEntries(entries,id);

    res.status(200).send(newEntry);

  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
