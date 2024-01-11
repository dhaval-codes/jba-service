import mongoose from "mongoose";
const { Schema } = mongoose;

const sideBarFormMetaDeta = new Schema({
    for: {type: String, required: true},
    dataArray: {type: Array, required: true}
})

export const SideBarFormMetaDeta = mongoose.model("sideBarFormMetaDeta", sideBarFormMetaDeta,"sideBarFormMetaDeta");