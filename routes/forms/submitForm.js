import { FormA1 } from "../../models/formA1.js";
import { FormC } from "../../models/formC.js";
import { FilledForm } from "../../models/filledForm.js";
import { departmentWiseFormType } from "../../utils/department-formSelector.js";
import { extractMonthAndYear } from "../../utils/extractDate.js";
import { applicantsDepartmentFinder } from "../../utils/applicantsDepartmentFinder.js";
import { convertToFractionalValue } from "../../utils/fractionalConverter.js";

export const recieveFormData = async (req,res)=> {
    try{
        // recieved all the necessary information
        const{
            formName,
            filledBy,
            applicantsName,
            fillersDesignation,
            applicantsStaffCode,
            applicantsDepartment,
            timePeriod,
            filledData
        } = req.body;

        const myApplicantsDepartment = await applicantsDepartmentFinder(applicantsName)

        const {month, year} = extractMonthAndYear(timePeriod)
        // processing form data to make array of objects
        if(formName === 'Appraisal Form A1') {
            const fetchingDepartmentName = departmentWiseFormType(applicantsDepartment)
            const completeFormData = await FormA1.findOne({for: fetchingDepartmentName})
            const quesAnsArray = completeFormData.formData;
            const passingLength = quesAnsArray[0].options.length

            let MyArray = []
            for(let i = 0; i < quesAnsArray.length; i++){
                MyArray.push({
                    ques: quesAnsArray[i].ques,
                    selectedAns: quesAnsArray[i].options[filledData[i]],
                    selectedNumber: filledData[i] + 1
                });
            }
           
            // treating form data
            const DraftData = [];
            for(let i=0; i<quesAnsArray.length; i++){
                DraftData.push({[`${quesAnsArray[i].ques}`]: filledData[i]+1})
            }
            // defining pushing Document
            const pushingObj = {
                name:formName,
                filledBy: filledBy,
                applicantsName: applicantsName ? applicantsName : filledBy,
                fillersDesignation: fillersDesignation,
                applicantsDepartment: myApplicantsDepartment,
                timePeriod: {
                    month: month,
                    year: year
                },
                filledData: DraftData,
                applicantsStaffCode: applicantsStaffCode,
                filledDataMarksArray: MyArray,
                cumalativeMarks: convertToFractionalValue(filledData,passingLength)
            }
            // Pushing to the DB
            const savedData = await FilledForm.create(pushingObj)
            if(savedData){
                res.send('submited')
            }           
        } else if (formName === 'Appraisal Form C') {
            const completeFormData = await FormC.findOne({name: formName})
            const quesAnsArray = completeFormData.arrayData;
            // treating form data
            const DraftData = [];
            for(let i=0; i<quesAnsArray.length; i++){
                DraftData.push({[quesAnsArray[i]]: filledData[i]})
            }
            // defining pushing Document
            const pushingObj = {
                name:formName,
                filledBy: filledBy,
                applicantsName: applicantsName ? applicantsName : filledBy,
                fillersDesignation: fillersDesignation,
                applicantsDepartment: myApplicantsDepartment,
                timePeriod: {
                    month: month,
                    year: year
                },
                filledData: DraftData,
                applicantsStaffCode: applicantsStaffCode
            }
            // Pushing to the DB
            const savedData = await FilledForm.create(pushingObj)
            if(savedData){
                res.send('submited')
            }  
        }
    } catch (e) {
        console.log(e)
        res.send('')
    }
}