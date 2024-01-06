import { Staff } from "../models/users.js";
import axios from "axios";

export const loginUser = async (req, res) => {
   try{
    const { staffCode, password } = req.body;
    let staffDetails = await Staff
        .find({ $and: [{ staffCode: staffCode }, { password: password }] }).select({ password: 0 });
        res.send(staffDetails);
   } catch{
    (e)=>{
        console.log(e)
    }
   }
};