import mongoose from "mongoose";
const { Schema } = mongoose;

const displayFacts = new Schema({
    facts: {type: String, required: true}
})

export const Facts = mongoose.model("Facts", displayFacts);
