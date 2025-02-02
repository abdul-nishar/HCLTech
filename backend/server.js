import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/config.env` });

import app from "./app.js";

app.use(cors());
app.options("*", cors());

const db = process.env.MONGODB_URI.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
).replace("<NAME>", process.env.MONGODB_NAME);

const connectToDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to database...");
  } catch (err) {
    console.log("Error while connecting to database!!");
    process.exit(1);
  }
};

connectToDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
