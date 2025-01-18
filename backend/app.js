import express from "express";
import { login, signUp, logout } from "./controllers/authController.js";
import {
  getAllParticipants,
  createNewSchedule,
  getHealthData,
  createHealthData
} from "./controllers/participantController.js";

const app = express();

app.use(express.json());

app.post("/api/v1/login", login);
app.post("/api/v1/signup", signUp);
app.get("/api/v1/logout", logout);

app.get("/api/v1/participants", getAllParticipants);

app.post("/api/v1/schedules/:type", createNewSchedule);

app.get("/api/v1/healthData/:id", getHealthData);
app.post("/api/v1/healthData/:userId", createHealthData);

export default app;
