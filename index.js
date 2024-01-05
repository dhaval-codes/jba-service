import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Staff } from "./models/users.js";

const app = express();
app.use(cors());
const port = 8080;
const mongoURL = "mongodb://localhost:27017/appraisalDB"

mongoose.connect(mongoURL)
.then(()=>{
    console.log("Successfully connected to MongoDB")
})
.catch((err)=>{
    console.log("Error in connection: ", err)
})

app.listen(port,()=>{
    console.log(`Backend is listening on ${port} successfully`)
})
