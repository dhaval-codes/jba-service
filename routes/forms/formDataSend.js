import { FormA1 } from "../../models/formA1.js";
import { FormC } from "../../models/formC.js";
import { departmentWiseFormType } from "../../utils/department-formSelector.js";
import { seniorFinder } from "../../utils/seniorFinder.js";
import { extractMonthAndYear } from "../../utils/extractDate.js";
import { FilledForm } from "../../models/filledForm.js";

export const formDataSend = async (req,res) => {
    try{
        const {department, role, name} = req.body;
        const currentDate = new Date();
        const {year} = extractMonthAndYear(currentDate)
        const availableData = await FilledForm.find({$and:
            [
                {filledBy:name},
                {"timePeriod.year":year} ,
                {applicantsName:name},
            ]})
        if(availableData.length === 0){
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
        } else if (availableData.length === 1) {
            const Senior = seniorFinder(role);
            const [singleItem] = availableData;
            if(singleItem.name === 'Appraisal Form A1'){
                let formC = await FormC.findOne();
                res.send(
                    [
                        {name: "Appraisal Form A1", content: "This form is already filled"},
                        {name: "Appraisal Form A2", content: `This form is filled by ${Senior}`},
                        {name: "Appraisal Form B", content: "This form is filled by students"},
                        formC
                    ]
                )
            } else if ( singleItem.name === 'Appraisal Form C'){
                const Senior = seniorFinder(role);
                const fetchFor = departmentWiseFormType(department);
                let formA1 = await FormA1.findOne({for: fetchFor});
                res.send(
                    [
                        formA1,
                        {name: "Appraisal Form A2", content: `This form is filled by ${Senior}`},
                        {name: "Appraisal Form B", content: "This form is filled by students"},
                        {name: "Appraisal Form C", content: "This form is already filled"}
                    ]
                )
            }
        } else if (availableData.length === 2){
            const Senior = seniorFinder(role);
            res.send(
                [
                    {name: "Appraisal Form A1", content: "This form is already filled"},
                    {name: "Appraisal Form A2", content: `This form is filled by ${Senior}`},
                    {name: "Appraisal Form B", content: "This form is filled by students"},
                    {name: "Appraisal Form C", content: "This form is already filled"}
                ]
            )
        }
    } catch (e) {
        console.log(e)
    }
}