import { Staff } from "../../models/users.js";
import { FormA1 } from "../../models/formA1.js";
import { departmentWiseFormType } from "../../utils/department-formSelector.js";
import { FilledForm } from "../../models/filledForm.js";
import { extractMonthAndYear } from "../../utils/extractDate.js";

export const sendA1formJunior = async (req,res) => {
    try{
        const name = req.query.for;
        const fillersName = req.query.fillersName;
        const infoForName = await Staff.findOne({name: name})
        const departmentToFind = departmentWiseFormType(infoForName.department)
        const FormData = await FormA1.findOne({for: departmentToFind})
        const currentDate = new Date();
        const {year} = extractMonthAndYear(currentDate)
        const checkItem = await FilledForm.findOne({$and:
            [
                {filledBy:fillersName},
                {"timePeriod.year":year} ,
                {applicantsName:name}
            ]})
        if(checkItem) {
            res.send({content: "This form is already filled"})
        } else {
            res.send(FormData)
        }
    } catch (e) {
        console.log(e)
    }
}