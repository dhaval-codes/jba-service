import { FormA1 } from "../../models/formA1.js";
import { FormC } from "../../models/formC.js";
import { FilledForm } from "../../models/filledForm.js";
import { departmentWiseFormType } from "../../utils/department-formSelector.js";
import { extractMonthAndYear } from "../../utils/extractDate.js";

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

        const {month, year} = extractMonthAndYear(timePeriod)
        // console.log(applicantsName)
        // processing form data to make array of objects
        if(formName === 'Appraisal Form A1') {
            const fetchingDepartmentName = departmentWiseFormType(applicantsDepartment)
            const completeFormData = await FormA1.findOne({for: fetchingDepartmentName})
            const quesAnsArray = completeFormData.formData;
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
                applicantsDepartment: applicantsDepartment,
                timePeriod: {
                    month: month,
                    year: year
                },
                filledData: DraftData
            }
            // Pushing to the DB
            const savedData = await FilledForm.create(pushingObj)
            res.send(savedData.__v)            
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
                applicantsDepartment: applicantsDepartment,
                timePeriod: {
                    month: month,
                    year: year
                },
                filledData: DraftData
            }
            // Pushing to the DB
            const savedData = await FilledForm.create(pushingObj)
            res.send(savedData.__v)   
        }
    } catch (e) {
        console.log(e)
        res.send(1)
    }
}