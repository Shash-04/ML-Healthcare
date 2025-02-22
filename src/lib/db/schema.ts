import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
  },
  healthData: [
    {
      type: Schema.Types.ObjectId,
      ref: "HealthData",
    },
  ],
})

const healthDataSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bloodPressure: {
    systolic: Number,
    diastolic: Number,
  },
  bloodGlucose: Number,
  heartRate: Number,
  temperature: Number,
  oxygenLevel: Number,
  notes: String,
})

const predictionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  predictions: {
    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    details: String,
    recommendations: [String],
  },
})

export const User = models.User || model("User", userSchema)
export const HealthData = models.HealthData || model("HealthData", healthDataSchema)
export const Prediction = models.Prediction || model("Prediction", predictionSchema)

