import mongoose from "mongoose"
const mongooseUniqueValidator = require("mongoose-unique-validator")






const Question = new mongoose.Schema({

    question: {
        type: String,
        required:[true,"You forgot to add the question itself"],
    },
    value: {
        type: Number,
        default: 100,
        required:true
    },
    type: {
        default: "value",
        type: String,
        required:[true,"Answer Type not set"]
    },
    multipleChoices: [
        {
            type:String
        }
    ],
    answer:String,
})


mongoose.plugin(mongooseUniqueValidator);

const QuestionModel = mongoose.model("Quesiton", Question);

export default QuestionModel;