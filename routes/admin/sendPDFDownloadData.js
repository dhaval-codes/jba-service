import { FilledForm } from "../../models/filledForm.js";

export const sendDownloadData = async (req,res)=>{
    try{
        const{formName, department, year} = req.body;
        const numYear = Number(year)
        let response;
        if(formName === 'Appraisal Form A1 and A2'){
            response = await FilledForm.find({$and:[
                {name: 'Appraisal Form A1'},
                {applicantsDepartment: department},
                {"timePeriod.year": numYear}
            ]})
            res.send(response)
        } else if(formName === 'Appraisal Form C'){
            response = await FilledForm.find({$and:[
                {name:formName},
                {applicantsDepartment:department},
                {"timePeriod.year": numYear}
            ]})
            res.send(response)
        }
    } catch (e){
        console.log(e)
    }
}