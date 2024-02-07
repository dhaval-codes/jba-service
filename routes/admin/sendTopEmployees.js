import { FilledForm } from "../../models/filledForm.js"

export const getTopEmployees = async (req,res) => {
    try{
        const send = req.body.send;
        if(send === 'Admin'){
            let draftArray1 = []
            const allFilledFormData = await FilledForm.find()
            allFilledFormData.map((item)=>{
                draftArray1.push(
                    {
                        name: item.applicantsName,
                        department: item.applicantsDepartment,
                        staffCode: item.applicantsStaffCode,
                        semiMarks: item.cumalativeMarks
                    }
                )
            })
            const filteredArray = Object.values(draftArray1.reduce((acc, obj) => {
                const key = obj.staffCode;
                if (!acc[key]) {
                    acc[key] = { staffCode: key, totalSemiMarks: 0, count: 0, marks: 0, name: obj.name, department: obj.department };
                }
                acc[key].totalSemiMarks += obj.semiMarks;
                acc[key].count++;
                acc[key].marks = acc[key].totalSemiMarks / acc[key].count;
                return acc; // Return the accumulator
            }, {}));  
            filteredArray.sort((a,b)=> b.marks - a.marks);
            const descendingFilteredArray = filteredArray.map(item => {
                item.marks = item.marks.toFixed(2)
                delete item.totalSemiMarks;
                delete item.count;
                return item;
            });
            const top3Employees = descendingFilteredArray.slice(0, 3);
            res.send(top3Employees)
        }
    } catch (e) {
        console.log(e)
    }
}