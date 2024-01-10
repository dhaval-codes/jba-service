import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// importing Apis now
import {loginUser} from "./login/login.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
const mongoURL = "mongodb://localhost:27017/appraisalDB"

//main api calls

app.post('/api/loginUser',(req,res)=>{
    loginUser(req,res);
});

// server set up

mongoose.connect(mongoURL)
.then(()=>{
    console.log("Successfully connected to MongoDB")
})
.catch((err)=>{
    console.log("Error in connection: ", err)
})

app.listen(port,()=>{
    console.log(`Magic happens on ${port} port`)
})
