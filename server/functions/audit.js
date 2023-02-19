import { getDateNow, getTimeNow } from "./time.js";
import { auditModel } from "../models/models.js";

import errorHandler from "../functions/errorHandler.js";

export default async (req, res, next) => {
  try {
    const { headers, httpVersion, method, socket, url, body } = req;
    const { remoteAddress, remoteFamily } = socket;
    const log = {
      timestamp: Date.now(),
      date: getDateNow(),
      time: getTimeNow(),
      headers,
      httpVersion,
      method,
      remoteAddress,
      remoteFamily,
      url,
      body,
    };
    const data = new auditModel(log);
    const dataToSave = await data.save();
  } catch (error) {
    errorHandler(error, res);
  }
  next();
};
