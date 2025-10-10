const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      maxLength: 10,
    },
    bloodgroup: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Patient", "Doctor", "Admin", "SuperAdmin"],
      default: "Patient",
      required: true,
    },

    specialty: {
      type: String,
      enum: [
        "consultant physician",
        "orthopedic & spine",
        "neuro surgery",
        "gastroenterology",
        "cardiology",
        "pediatric",
        "gynac & obstretic",
        "general surgery",
        "skin (cosmo & trico)",
        "anathesia",
      ],
    },
    degree: {
      type: String,
    },
    schedule_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      // required: true,
    },

    permissions: {
      type: [
        {
          type: String,
          enum: [
            "MANAGE_USERS",
            "VIEW_REPORTS",
            "EDIT_SETTINGS",
            "MANAGE_CONTENT",
            "MANAGE_PERMISSIONS",
          ],
        },
      ],
      default: [],
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    schedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
