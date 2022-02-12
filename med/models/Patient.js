const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Patients_schema = new Schema(
  {
    Patient_ID: {
      type: String,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20,
    },
    Address: {
      type: String,
    },
    Age: {
      type: Number,
      required: true,
    },
    Gender: {
      type: String,
    },
    Details: {
      past_diseases: { type: Array },
      active_diseases: { type: Array },
      active_medicines: { type: Array },
      followup_date: { type: Array },
    },
    mobile: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Reset_pass_token: {
      type: String,
    },
    Is_verified: {
      type: Boolean,
      default: False,
    },
    Doctor: [
      {
        Name: { type: String },
        Speciality: { type: String },
        Prescriptions: [
          {
            Patient_ID: { type: String },
            Doctor_ID: { type: String },
            Prescription_ID: { type: String },
            Date: { type: Date },
            Daigonisis: { type: String },
            Tablets: { type: Array },
            Syrups: { type: Array },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Patients = mongoose.model("Patients", Patients_schema);

module.exports = Patients;
