import mongoose from "mongoose";
const { Schema } = mongoose;

const formC = new Schema({
    name: {type: String, required: true},
    for: {type: String, required: true},
    arrayData: {type: Array, required: true}
})

export const FormC = mongoose.model("formC", formC, "FormCData")