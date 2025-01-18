import mongoose from "mongoose";
import validator from "validator";

const demographicSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide full name of the participant"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide date of birth of the participant"],
  },
  gender: {
    type: String,
    required: [true, "Please provide gender of the participant"],
    enum: ["male", "female", "other"],
  },
  maritalStatus: {
    type: String,
    required: [true, "Please provide marital status of the participant"],
    enum: ["single", "married", "divorced", "widowed", "other"],
  },
  address: {
    type: String,
    required: [true, "Please provide address of the participant"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please provide phone number of the participant"],
    length: 10,
  },
  email: {
    type: String,
    required: [true, "Please provide email of the participant"],
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  employmentStatus: {
    type: String,
    required: [true, "Please provide employment status of the participant"],
    enum: ["Employed", "Unemployed", "Retired", "Student", "Other"],
  },
  occupation: {
    type: String,
    required: [true, "Please provide occupation of the participant"],
  },
  education: {
    type: String,
    required: [true, "Please provide education of the participant"],
    enum: [
      "No Formal Education",
      "High School",
      "Bachelor’s Degree",
      "Master’s Degree",
      "Doctorate",
      "Other",
    ],
  },
  race: {
    type: String,
    required: [true, "Please provide race of the participant"],
  },
  nationality: {
    type: String,
    required: [true, "Please provide nationality of the participant"],
  },
  primaryLanguages: {
    type: String,
    required: [true, "Please provide languages of the participant"],
  },
  healthStatus: {
    type: String,
    required: [true, "Please provide health status of the participant"],
  },
});

const DemographicData = mongoose.model("DemographicData", demographicSchema);

export default DemographicData;
