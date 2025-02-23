import mongoose, { Schema, Document } from "mongoose";

export interface LabReport {
  imageUrl: string; // URL to store the image of lab report
  uploadedAt: Date;
}

export interface HealthMetric {
  bloodPressure: {
    systolic: number;
    diastolic: number;
    status: string;
  };
  bloodGlucose: {
    level: number;
    status: string;
  };
  heartRate: {
    bpm: number;
    status: string;
  };
  oxygenLevel: {
    percentage: number;
    status: string;
  };
  healthTrends: {
    date: Date;
    metric: string;
    value: number;
  }[];
}

export interface HealthReport extends Document {
  healthMetrics: HealthMetric;
  labReports: LabReport[]; // Array to store multiple lab report images
  createdAt: Date;
  updatedAt: Date;
}

const healthReportSchema: Schema<HealthReport> = new Schema({
  healthMetrics: {
    type: Object,
    required: true,
    default: {
      bloodPressure: { systolic: 120, diastolic: 80, status: "Normal range" },
      bloodGlucose: { level: 90, status: "Fasting" },
      heartRate: { bpm: 70, status: "Resting" },
      oxygenLevel: { percentage: 98, status: "SpO2" },
      healthTrends: [],
    },
  },
  labReports: [
    {
      imageUrl: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isverified: boolean;
  age: number;
  gender: string;
  height: string;
  weight: string;
  smokingStatus: string;
  regularExercise: boolean;
  alcoholStatus: string;
  healthReports: HealthReport[];
}

const userSchema: Schema<User> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  verifyCode: { type: String, required: true },
  isverified: { type: Boolean, required: true, default: false },
  verifyCodeExpiry: { type: Date, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  smokingStatus: { type: String, required: true },
  regularExercise: { type: Boolean, required: true },
  alcoholStatus: { type: String, required: true },
  healthReports: [healthReportSchema], // Array of health reports with lab report images
}, { timestamps: true });

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;
