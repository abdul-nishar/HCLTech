import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  scheduleDate: Date,
  typeOfVisit: {
    type: String,
    required: [true, "Please provide type of visit"],
    enum: ["Checkup", "Vaccination"],
  },
  statusOfSchedule: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  participantId: {
    type: mongoose.Schema.ObjectId,
    ref: "Participant",
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
