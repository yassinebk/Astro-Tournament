import mongoose, { ObjectId } from "mongoose";

export interface Level {
  number: number;
  questions: ObjectId[];
  id?: string;
  _id?: string;
}

const Level = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "Level Number not set "],
  },
  questions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Question",
    },
  ],
});

const LevelModel = mongoose.model("Level", Level);

export default LevelModel;
