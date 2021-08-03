import mongoose from "mongoose";





const Level = new mongoose.Schema({
    number: {
        type: Number,
        required:[true,"Level Number not set "]
    },
    questions:[ {
        type: mongoose.Types.ObjectId,
        ref:"Question"
    }]
})

const levelModel = mongoose.model("Level", Level);


export default levelModel;