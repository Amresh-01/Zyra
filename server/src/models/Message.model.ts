import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  messageId: string;
  studentId: string;
  from: string;
  subject: string;
  preview: string;
  read: boolean;
  receivedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    studentId: {
      type: String,
      required: true,
      index: true,
    },

    from: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    preview: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
      index: true,
    },

    receivedAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);