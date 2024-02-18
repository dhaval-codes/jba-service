import { FilledForm } from "../../models/filledForm.js";

export const sendDownloadData = async (req,res)=>{
    try{
        const{formName, department, year, role} = req.body;
        if(role === 'Admin'){
            const numYear = Number(year)
            let response;
            if(formName === 'Appraisal Form A1 and A2'){
                if(department !== 'Others'){
                    response = await FilledForm.find({$and:[
                        {name: 'Appraisal Form A1'},
                        {applicantsDepartment: department},
                        {"timePeriod.year": numYear}
                    ]})
                    res.send(response)
                } else if (department === 'Others') {
                    const excudedDept = ['english','hindi','maths','science','cs','commerce','humanities','psycology','pe','perArts']
                    response = await FilledForm.find({
                        $and: [
                            { name: 'Appraisal Form A1' },
                            { applicantsDepartment: { $nin: excudedDept } },
                            { "timePeriod.year": numYear }
                        ]
                    });
                    res.send(response)
                }
            } else if(formName === 'Appraisal Form C'){
                if(department !== 'Others'){
                    response = await FilledForm.find({$and:[
                        {name:formName},
                        {applicantsDepartment:department},
                        {"timePeriod.year": numYear}
                    ]})
                    res.send(response)
                } else if (department === 'Others') {
                    const excudedDept = ['english','hindi','maths','science','cs','commerce','humanities','psycology','pe','perArts']
                    response = await FilledForm.find({
                        $and: [
                            { name: 'Appraisal Form C' },
                            { applicantsDepartment: { $nin: excudedDept } },
                            { "timePeriod.year": numYear }
                        ]
                    });
                    res.send(response)
                }
            }
        } else {
            res.send('Better luck next time')
        }
    } catch (e){
        console.log(e)
    }
}