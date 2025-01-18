import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const participantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    max: [20, "Username should be less than 20 characters"],
    min: [6, "Username should be more than 6 characters"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: [
      "Participant",
      "Principal Investigator",
      "Clinical Research Coordinator",
      "Regulatory Authority",
    ],
    default: "Participant",
  },
  level: {
    type: Number,
    default: -1,
  },
  healthData: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "HealthData",
    },
  ],
  demographicData: { type: mongoose.Schema.ObjectId, ref: "DemographicData" },
  schedules: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Schedules",
    },
  ],
});

participantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirmation = undefined;
  next();
});

participantSchema.methods.passwordVerification = async (
  candidatePassword,
  userPassword
) => await bcrypt.compare(candidatePassword, userPassword);

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
