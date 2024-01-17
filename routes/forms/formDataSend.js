import { FormA1 } from "../../models/formA1.js";
import { FormC } from "../../models/formC.js";
import { departmentWiseFormType } from "../../utils/department-formSelector.js";
import { seniorFinder } from "../../utils/seniorFinder.js";

export const formDataSend = async (req,res) => {
    try{
        const {department, role} = req.body;
        const Senior = seniorFinder(role);
        const fetchFor = departmentWiseFormType(department);
        let formA1 = await FormA1.findOne({for: fetchFor});
        let formC = await FormC.findOne();
        res.send(
            [formA1,
            {name: "Appraisal Form A2", content: `This form is filled by ${Senior}`},
            {name: "Appraisal Form B", content: "This form is filled by students"},
            formC]
        )
    } catch (e) {
        console.log(e)
    }
}