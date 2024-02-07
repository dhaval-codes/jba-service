import mongoose from "mongoose";
const { Schema } = mongoose;

const filledForm = new Schema({
    name: {type: String, required: true},
    filledBy: {type: String, required: true},
    applicantsName: {type: String, required: true},
    fillersDesignation: {type: String, required: true},
    applicantsDepartment: {type: String, required: true},
    timePeriod: {type: Object, required: true},
    filledData: {type: Array, required: true},
    applicantsStaffCode: {type: Number, required: true},
    filledDataMarksArray: {type: Array, required: false},
    cumalativeMarks: {type: Number, required: false}
})

export const FilledForm = mongoose.model("FilledForm", filledForm);