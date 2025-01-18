import mongoose from "mongoose";

const healthDataSchema = new mongoose.Schema({
  heartRate: {
    type: Number,
    required: [true, "Please provide heart rate of the participant"],
  },
  bloodPressure: [],
  respiratoryRate: {
    type: Number,
    required: [true, "Please provide respiratory rate of the participant"],
  },
  bodyTemperature: {
    type: Number,
    required: [true, "Please provide body temperature of the participant"],
  },
  oxygenSaturation: {
    type: Number,
    required: [true, "Please provide oxygen saturation of the participant"],
  },
  weight: {
    type: Number,
    required: [true, "Please provide weight of the participant"],
  },
  height: {
    type: Number,
    required: [true, "Please provide height of the participant"],
  },
  electroCardioGram: {
    type: Number,
    required: [true, "Please provide ECG of the participant"],
  },
  bloodGlucoseLevels: {
    type: Number,
    required: [true, "Please provide blood glucose levels of the participant"],
  },
  urineOutput: {
    type: Number,
    required: [true, "Please provide urine output of the participant"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Participant",
  },
});

const healthData = mongoose.model("HealthData", healthDataSchema);

export default healthData;
