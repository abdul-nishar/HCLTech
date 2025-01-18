import Participant from "../models/participantModel.js";
import Schedule from "../models/scheduleModel.js";
import HealthData from "../models/healthDataModel.js";
import DemographicData from "../models/demographicDataModel.js";

const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();

    res.status(200).json({
      status: "success",
      data: {
        participants,
      },
    });
  } catch (err) {
    console.log("Error in get all participants controller : ", err.message);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();

    res.status(201).json({
      status: "success",
      data: {
        schedules,
      },
    });
  } catch {
    console.log("Error in get all schedules controller : ", err.message);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

const createNewSchedule = async (req, res) => {
  try {
    const { type } = req.params;
    const newSchedule = await Schedule.create({ typeOfVisit: type });

    res.status(201).json({
      status: "success",
      data: {
        newSchedule,
      },
    });
  } catch (err) {
    console.log("Error in create schedule controller : ", err.message);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSchedule)
      return res
        .status(404)
        .json({ status: "fail", message: "No document found with this id" });

    res.status(201).json({
      status: "success",
      data: {
        updatedSchedule,
      },
    });
  } catch (err) {
    console.log("Error in update schedule controller : ", err.message);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

const getHealthData = async (req, res) => {
  try {
    const healthData = await HealthData.findById(req.params.id);

    if (!healthData)
      return res
        .status(400)
        .json({ status: "fail", message: "Document Not Found" });

    res.status(200).json({
      status: "success",
      data: {
        healthData,
      },
    });
  } catch (err) {
    console.log("Error in get health data controller : ", err.message);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

const createHealthData = async (req, res) => {
  try {
    const newHealthData = await HealthData.create({
      userId: req.params.userId,
      ...req.body,
    });

    res.status(200).json({
      status: "success",
      data: {
        newHealthData,
      },
    });
  } catch (err) {
    console.log("Error in create health data controller : ", err.message);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

const getDemographicData = async (req, res) => {
  try {
    const demographicData = await DemographicData.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        demographicData,
      },
    });
  } catch (err) {
    console.log("Error in get demographic data controller : ", err.message);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

const createDemographicData = async (req, res) => {
  try {
    const demographicData = await DemographicData.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        demographicData,
      },
    });
  } catch (err) {
    console.log("Error in get demographic data controller : ", err.message);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

export {
  getAllParticipants,
  createNewSchedule,
  getHealthData,
  createHealthData,
  getAllSchedules,
  updateSchedule,
  getDemographicData,
  createDemographicData,
};
