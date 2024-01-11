import mongoose from "mongoose";
const { Schema } = mongoose;

const fillersDescription = new Schema ({
    for: {type: String, required: true},
    dataArray: {type: Array, required: true}
})

export const FillersDescription = mongoose.model("fillersDescription", fillersDescription);

  