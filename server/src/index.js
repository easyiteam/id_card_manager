import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import "./passport.js";
// import { dbConnect } from "./mongo/index.js";
import { meRoutes, authRoutes } from "./routes/index.js";
import path from "path";
import * as fs from "fs";
import cron from "node-cron";
import ReseedAction from "./mongo/ReseedAction.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

const whitelist = "http://localhost:5173";
const corsOptions = {
  // origin: function (origin, callback) {
  //   if (!origin || whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // }, 
  origin: 'http://localhost:5173',
  credentials: true,
};

// dbConnect(); 

/** 
 * Connect to MongoDB
 * @type {string}
 */
const uri = "mongodb+srv://Klasik:i8sjfHDq2OlBFYSz@cluster0.11sqa.mongodb.net/iDCardManager?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to db');
  })
  .catch(() => {
    console.log('Error while connecting to DB');
  });


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ type: "application/vnd.api+json", strict: false }));

app.get("/", function (req, res) {
  const __dirname = fs.realpathSync(".");
  res.sendFile(path.join(__dirname, "/src/landing/index.html"));
});

app.use("/", authRoutes);
app.use("/me", meRoutes);

if (process.env.SCHEDULE_HOUR) {
  cron.schedule(`0 */${process.env.SCHEDULE_HOUR} * * *'`, () => {
    ReseedAction();
  });
}

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
