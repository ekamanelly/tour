import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  text: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  createBy:{ type: String,},
});

const questionDB = mongoose.connection.useDb("questionDB");

export const Question = questionDB.model("question", questionSchema);
