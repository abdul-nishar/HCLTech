import jwt from "jsonwebtoken";

import Participant from "../models/participantModel.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000
    ),
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user: user,
  });
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new Error("Please enter username and password", 400));
    }
    // 2) Check if user exists
    const user = await Participant.findOne({ username }).select("+password");

    if (!user || !(await user.passwordVerification(password, user.password))) {
      return next(new Error("Please enter a valid username or password", 401));
    }
    // 3) If everything verifies, send token to client
    createSendToken(user, 200, req, res);
  } catch (err) {
    console.log("Error in login controller : ", err.message);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

const signUp = async (req, res, next) => {
  try {
    const newUser = await Participant.create(req.body);
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    console.log("Error in sign up controller : ", err.message);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expiresIn: new Date(Date.now() + 10 * 1000),
  });

  res.status(200).json({ status: "success" });
};

export { login, signUp, logout };
