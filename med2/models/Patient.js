const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Patients_schema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    _id: {
      type: mongoose.Schema.type.ObjectId,
      ref: "users",
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
      past_diseases: [{ type: String }],
      active_diseases: [{ type: String }],
      active_medicines: [{ type: String }],
      followup_date: [{ type: String }],
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
