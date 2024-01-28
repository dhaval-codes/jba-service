import { Staff } from "../../models/users.js";

export const checkPasswordFunc = async (req, res) => {
    try {
        const {name, checkPassword} = req.body
        let Confirmation = await Staff.find({ $and: [{name: name}, {password: checkPassword}] }).select({password:0});
        res.send(Confirmation)
    } catch (e) {
        console.log(e)
    }

}