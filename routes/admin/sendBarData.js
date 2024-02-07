import { FilledForm } from "../../models/filledForm.js"

export const sendAdminBarChartData = async (req,res) =>{
    try{
        const {send} = req.body
        const role = send
        if(role === 'Admin'){
            let arrayOfAllForm = await FilledForm.find({name: 'Appraisal Form A1'})
            const ScienceDept = [];
            const CsDept = [];
            const EngDept = [];
            const PerArtsDept = [];
            const HumanitiesDept = [];
            const PeDept = [];
            const ArtDept = [];
            const PsyDept = [];
            const CommerceDept = [];
            const MathsDept = [];
            const HindiDept = [];
            const OtherDept = [];
            arrayOfAllForm.map((item)=>{
                switch (item.applicantsDepartment) {
                    case 'science': ScienceDept.push(item);
                    break;

                    case 'cs' : CsDept.push(item);
                    break;

                    case 'english': EngDept.push(item);
                    break;

                    case 'perArts': PerArtsDept.push(item);
                    break;

                    case 'humanities': HumanitiesDept.push(item);
                    break;

                    case 'pe': PeDept.push(item);
                    break;

                    case 'art': ArtDept.push(item);
                    break;

                    case 'psycology': PsyDept.push(item);
                    break;

                    case 'commerce': CommerceDept.push(item);
                    break;

                    case 'maths': MathsDept.push(item);
                    break;

                    case 'hindi': HindiDept.push(item);
                    break;

                    default: OtherDept.push(item);
                }
            })
            const CumalativeArrray = [EngDept, HindiDept, MathsDept, ScienceDept, HumanitiesDept, CommerceDept, CsDept, PsyDept, ArtDept, PerArtsDept, OtherDept]
            const Draft1 = [];

            CumalativeArrray.forEach((department) => {
                let departmentSum = 0;
                let departmentName = '';

                // Iterate over each object in the department array
                department.forEach((obj) => {
                    departmentName = obj.applicantsDepartment; // Assuming department name is the same for all objects in the array
                    departmentSum += obj.filledData;
                });

                // Calculate the average filledData for the department
                const departmentAverage = (departmentSum)*5;

                // Push department name and average to Draft1 array
                Draft1.push({ department: departmentName, averageFilledData: departmentAverage });
            });

            // console.log(Draft1)
        } else (
            res.send("Sorry you can't bypass this system")
        )
    } catch (e) {
        console.log(e)
    }
}