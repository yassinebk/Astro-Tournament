import mongoose from "mongoose";
const mongooseUniqueValidator = require("mongoose-unique-validator");
import { ObjectId } from "mongoose";

export type ROLE = "ADMIN" | "PLAYER";
export interface User {
  fullname: string;
  dateOfBirth: Date;
  username: string;
  email: string;
  password: string;
  role: ROLE;
  level: ObjectId;
  id?: string;
  _id?: string;
}
const userSchema = new mongoose.Schema({
  dateOfBirth: {
    type: Date,
  },
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: String,
  score: Number,
  role: {
    type: String,
    enum: ["ADMIN", "PLAYER"],
    required: [true, "Role must be set"],
  },
  level: {
    type: mongoose.Types.ObjectId,
    ref: "Level",
  },
});

mongoose.plugin(mongooseUniqueValidator);
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
