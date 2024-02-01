import mongoose from "mongoose";
const {Schema} = mongoose;

const formA1 = new Schema({
    name: {type: String, required: true},
    for: {type: String, required: true},
    formData: {type: Array, required: true}
})

export const FormA1 = mongoose.model("FormA1", formA1,"FormA1Data");