import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// importing Apis now
import { loginUser } from "./login/login.js";
import { getRandomFact } from "./facts/facts.js";
import { sideBarFormMetaDeta } from "./routes/sidebar/sidebarMetaDeta.js";
import { sidebarColorDetails } from "./routes/sidebar/colorData.js";
import { formDataSend } from "./routes/forms/formDataSend.js";
import { juniorA2Stafflist } from "./routes/juniorA2/sidebarStaffName.js";
import { sendA1formJunior } from "./routes/juniorA2/sendFormData.js";
import { staffListAdminFunc } from "./routes/admin/employeeList.js";
import { checkPasswordFunc } from "./routes/password/changePassword.js";
import { setPasswordFunc } from "./routes/password/setPassword.js";

// import of test API function
import { testFunc } from "./test/test.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
const mongoURL = "mongodb://localhost:27017/appraisalDB"

//main api calls

app.post('/api/loginUser',(req,res)=>{
    loginUser(req,res);
});
app.get('/api/facts',(req,res)=>{
    getRandomFact(req,res);
});
app.get('/api/sideBarFormData',(req,res)=>{
    sideBarFormMetaDeta(req, res);
});
app.get('/api/sidebarColorDetails',(req,res)=>{
    sidebarColorDetails(req,res);
})
app.post('/api/formData', (req,res)=>{
    formDataSend(req,res);
})
app.post('/api/juniorA2/stafflist', (req,res)=>{
    juniorA2Stafflist(req,res);
})
app.get('/api/juniorA2/formData', (req,res)=>{
    sendA1formJunior(req,res);
})
app.post('/api/admin/employeeList', (req,res)=>{
    staffListAdminFunc(req,res);
})
app.post(`/api/setPassword`, (req,res)=>{
    checkPasswordFunc(req,res);
})
app.post('/api/applyChangedPassword', (req,res)=>{
    setPasswordFunc(req,res);
})

// test API call
app.post('/api/test', (req,res)=>{
    testFunc(req,res)
})

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
