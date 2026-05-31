import mongoose from "mongoose";
import dotenv from "dotenv";
import { Student } from "../models/student.model";
import { Task } from "../models/task.model";
import { Message } from "../models/message.model";

dotenv.config();

const students = [
  {
    studentId: "stu_001",
    name: "Maya Patel",
    email: "maya.patel@school.edu",
    grade: 11,
    gpa: 3.2,
    counselorId: "csl_001",
    enrollmentStatus: "at_risk",
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  await Student.deleteMany({});
  await Task.deleteMany({});
  await Message.deleteMany({});

  await Student.insertMany(students);

  console.log("Seed completed");
  process.exit(0);
};

run();