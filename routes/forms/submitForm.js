import { FormA1 } from "../../models/formA1.js";
import { FormC } from "../../models/formC.js";
import { departmentWiseFormType } from "../../utils/department-formSelector.js";

export const recieveFormData = async (req,res)=> {
    try{
        // recieved all the necessary information
        const{
            formName,
            filledBy,
            applicantsName,
            fillersDesignation,
            applicantsDepartment,
            timePeriod,
            filledData
        } = req.body;
        // console.log(req.body)
        // processing filled data information to make Array of objects with questions and answers
        if(formName === 'Appraisal Form A1') {
            const fetchingDepartmentName = departmentWiseFormType(applicantsDepartment)
            console.log(fetchingDepartmentName)
            const completeFormData = await FormA1.findOne({for: fetchingDepartmentName})
            console.log(completeFormData.formData);
        }
            res.send('working')
    } catch (e) {
        console.log(e)
        res.send("Can't save form")
    }
}