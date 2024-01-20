import { Staff } from "../../models/users.js";
import { FormA1 } from "../../models/formA1.js";
import { departmentWiseFormType } from "../../utils/department-formSelector.js";

export const sendA1formJunior = async (req,res) => {
    try{
        const name = req.query.for;
        const infoForName = await Staff.findOne({name: name})
        const departmentToFind = departmentWiseFormType(infoForName.department)
        const FormData = await FormA1.findOne({for: departmentToFind})
        res.send(FormData)
    } catch (e) {
        console.log(e)
    }
}