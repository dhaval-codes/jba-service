import mongoose from "mongoose";
const { Schema } = mongoose;

const staffLoginDetails = new Schema({
    staffCode: { type: Number, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: {type: String, required: true},
    department: {type: String, required: true}
})

export const Staff = mongoose.model("Staff", staffLoginDetails, "staffLoginDetails");
