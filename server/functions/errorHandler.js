import { getDateNow, getTimeNow } from "./time.js";
import { errorModel } from "../models/models.js";

export default async (error, res) => {
  const log = {
    timestamp: Date.now(),
    date: getDateNow(),
    time: getTimeNow(),
    error: error,
  };

  console.log(log);
  const data = new errorModel(log);
  const dataToSave = await data.save();
  res.status(400).json({ message: error.message });
};
