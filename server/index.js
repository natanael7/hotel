import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import audit from "./functions/audit.js";

dotenv.config();
const mongoString = process.env.DATABASE_URL;

import express, { json, urlencoded } from "express";

import mongoose from "mongoose";

import routes from "./routes/routes.js";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(json());
app.use(audit);
app.use(urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

app.use("/api", routes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});

async function main() {
  mongoose.set("strictQuery", false);

  mongoose.connect(mongoString);

  const database = mongoose.connection;

  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
}

main();
