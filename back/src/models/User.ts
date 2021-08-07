import mongoose from "mongoose";
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
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

