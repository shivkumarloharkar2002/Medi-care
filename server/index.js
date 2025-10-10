const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connectMongoDB } = require("./db/connectMongoDB");
const Router = require("./router/api.route");
const cron = require('node-cron');
const moment = require('moment-timezone');
const axios = require('axios');  // Import axios
const Schedule = require("./model/Schedule.model"); // Import your Schedule model

dotenv.config();

const allowedOrigins = [
  'http://localhost:3000',
  "https://sai-hospital-xi.vercel.app",
  "https://sai-hospital-theta.vercel.app"
];

// Enable CORS and configure it
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Use your routes  
app.use("/", Router);

// Cron Job to Ping the Server at 11:55 PM to wake it up
cron.schedule("56 23 * * *", async () => {
  try {
    await axios.get("https://sai-hospital-xnoo.onrender.com/ping");
    console.log("Pinged self to wake up the server before the 11:58 PM job.");
  } catch (error) {
    console.error("Error pinging self to wake up:", error);
  }
});

// Cron Job to Reset Schedules at 11:58 PM
cron.schedule("58 23 * * *", async () => {
  const today = moment().tz('Asia/Kolkata').format('dddd');
  try {
    const schedules = await Schedule.find({ "scheduleWeek.day": today });

    if (schedules.length > 0) {
      schedules.forEach(async (schedule) => {
        schedule.scheduleWeek.forEach((daySchedule) => {
          const date = new Date(daySchedule.date);
          console.log(date ,"current");
          if (daySchedule.day === today) {
            daySchedule.time.forEach(async (timeSlot) => {
              timeSlot.Booking = 0; // Reset Booking count
              timeSlot.patients = []; // Clear patients array
            });
            date.setDate(date.getDate() + 7);
            console.log(date,"this is date");
            daySchedule.date = date;
          }
        });

        await schedule.save();
      });
      console.log(`Schedule reset for ${today} for the upcoming week.`);
    }
  } catch (error) {
    console.error("Error resetting schedule:", error);
  }
});

// Start the server and connect to the database
const port = process.env.PORT || 5050;  // Use PORT from environment or fallback to 5050
app.listen(port, () => {
  connectMongoDB();
  console.log(`Listening on *:${port}`);
});
