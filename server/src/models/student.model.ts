import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  studentId: string;
  name: string;
  email: string;
  grade: number;
  gpa: number;
  counselorId: string;
  enrollmentStatus: "active" | "at_risk" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    grade: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    gpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    counselorId: {
      type: String,
      required: true,
      index: true,
    },

    enrollmentStatus: {
      type: String,
      enum: ["active", "at_risk", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.index({ counselorId: 1, enrollmentStatus: 1 });

export const Student = mongoose.model<IStudent>(
  "Student",
  studentSchema
);