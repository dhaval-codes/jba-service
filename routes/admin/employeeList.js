import { Staff } from "../../models/users.js";
import { FilledForm } from "../../models/filledForm.js";
import { extractMonthAndYear } from "../../utils/extractDate.js";

export const staffListAdminFunc = async (req,res) => {
    try{
        const {role, date} = req.body
        const {year}= extractMonthAndYear(date)
        if (role === 'Admin'){
            const staffList = await Staff.find().select({ password: 0 });
            let newArray = [];
            staffList.map((item)=>{
                newArray.push({
                    name: item.name,
                    staffCode: item.staffCode,
                    department: item.department
                })
            })
            const filledFormData = await FilledForm.find({'timePeriod.year': year})
            const sendingArray = [];

            newArray.forEach(newItem => {
                // Check if both appraisals are filled for the current staff member
                const hasFilledA1 = filledFormData.some(filledForm => 
                    newItem.name === filledForm.applicantsName &&
                    newItem.staffCode === filledForm.applicantsStaffCode &&
                    newItem.department === filledForm.applicantsDepartment &&
                    filledForm.name === 'Appraisal Form A1'
                );

                const hasFilledC = filledFormData.some(filledForm => 
                    newItem.name === filledForm.applicantsName &&
                    newItem.staffCode === filledForm.applicantsStaffCode &&
                    newItem.department === filledForm.applicantsDepartment &&
                    filledForm.name === 'Appraisal Form C'
                );

                // Add the staff member to the sendingArray if both appraisals are filled
                if (hasFilledA1 && hasFilledC) {
                    sendingArray.push({
                        name: newItem.name,
                        staffCode: newItem.staffCode,
                        department: newItem.department,
                        appraisalA1: 'Filled',
                        appraisalC: 'Filled'
                    });
                } else if (hasFilledA1) {
                    // Add the staff member with only Appraisal A1 filled
                    sendingArray.push({
                        name: newItem.name,
                        staffCode: newItem.staffCode,
                        department: newItem.department,
                        appraisalA1: 'Filled',
                        appraisalC: 'Not-Filled'
                    });
                } else if (hasFilledC) {
                    // Add the staff member with only Appraisal C filled
                    sendingArray.push({
                        name: newItem.name,
                        staffCode: newItem.staffCode,
                        department: newItem.department,
                        appraisalA1: 'Not-Filled',
                        appraisalC: 'Filled'
                    });
                } else {
                    sendingArray.push({
                        name: newItem.name,
                        staffCode: newItem.staffCode,
                        department: newItem.department,
                        appraisalA1: 'Not-Filled',
                        appraisalC: 'Not-Filled'
                    })
                }
            });
            res.send(sendingArray)
        } else {
            res.send('Better luck next time breaching security of this application')
        }
    } catch (e) {
        console.log(e)
    }
}