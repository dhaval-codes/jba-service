import { Staff } from "../../models/users.js";

export const setPasswordFunc = async (req,res)=> {
    try{
        const {name, oldPassword, newPassword} = req.body
        let changingObj = await Staff.findOne({ $and: [{name: name}, {password: oldPassword}] })
        if(!changingObj){
            res.send(false)
        } else {
            try{
                changingObj.password = newPassword
                await changingObj.save();
                res.send(true)
            } catch (e) {
                console.log(e)
                res.send(false)
            }
        }
    } catch (e) {
        console.log(e)
    }
}