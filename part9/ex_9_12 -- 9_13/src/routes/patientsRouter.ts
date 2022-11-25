import express from "express";
import patientsServices from "../services/patientsServices";
import { NewPatient } from "../types";
import toTyped from "../utilis";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).send(patientsServices.getSafePatients());
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

export default router;
