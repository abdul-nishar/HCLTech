import express from "express";
import { login, signUp, logout } from "./controllers/authController.js";
import {
  getAllParticipants,
  createNewSchedule,
  getHealthData,
  createHealthData,
  getAllSchedules,
  updateSchedule,
  getDemographicData,
  createDemographicData,
} from "./controllers/participantController.js";

const app = express();

app.use(express.json());

app.post("/api/v1/login", login);
app.post("/api/v1/signup", signUp);
app.get("/api/v1/logout", logout);

app.get("/api/v1/participants", getAllParticipants);

app.get("/api/v1/healthData/:id", getHealthData);
app.post("/api/v1/healthData/:userId", createHealthData);

app.get("/api/v1/schedules", getAllSchedules);
app.patch("/api/v1/schedules/:id", updateSchedule);
app.post("/api/v1/schedules/:type", createNewSchedule);

app.post("/api/v1/:id/demographicData", createDemographicData);
app.get("/api/v1/demographicData/:id", getDemographicData);

export default app;
