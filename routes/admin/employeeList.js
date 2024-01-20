import { Staff } from "../../models/users.js";

export const staffListAdminFunc = async (req,res) => {
    try{
        const {sendData} = req.body
        if(sendData){
            let data = await Staff.find().select({password:0})
            res.send(data)
        }
    } catch (e) {
        console.log(e)
    }
}