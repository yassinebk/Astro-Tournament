import mongoose from "mongoose";
const mongooseUniqueValidator = require("mongoose-unique-validator");

export type QUESTION_TYPE = "MULTIPLE_ANSWERS" | "ANSWER";
export interface Question {
  type: QUESTION_TYPE;
  value?: number;
  answer?: string;
}

const Question = new mongoose.Schema({

  question: {
    type: String,
    enum: ["MULTIPLE_ANSWERES", "ANSWER"],
    required: [true, "You forgot to add the question itself"],
  },
  value: {
    type: Number,
    default: 100,
    required: true,
  },
  type: {
    default: "value",
    type: String,
    required: [true, "Answer Type not set"],
  },
  multipleChoices: [
    {
      type: String,
    },
  ],
  answer: String,
});

mongoose.plugin(mongooseUniqueValidator);

const QuestionModel = mongoose.model("Question", Question);

export default QuestionModel;
