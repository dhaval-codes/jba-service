import { FilledForm } from "../../models/filledForm.js"
import { FormA1 } from "../../models/formA1.js"
import { departmentWiseFormType } from "../../utils/department-formSelector.js"
import { GetStaffCodeFunc } from "../../utils/getStaffCodeFunc.js"

export const getTopEmployees = async (req,res) => {
    try{
        const send = req.body.send
        if(send){
            const allFilledData = await FilledForm.find({name: 'Appraisal Form A1'})
            let anotherArray = [];
            await Promise.all(allFilledData.map(async (item, i) => {
                let filledArray = item.filledData.map(obj => Object.values(obj)[0]);
                let department = item.applicantsDepartment;
                let checkDepartment = departmentWiseFormType(department);
                let Form = await FormA1.findOne({ for: checkDepartment });
                let maxRating = Form.formData[0].options.length;
                let name = item.applicantsName;
                let totalNumber = filledArray.reduce((total, num) => total + num, 0);
                let fraction = ((totalNumber / filledArray.length) / maxRating) * 5;
                anotherArray.push({ name: name, department: department, fracArray: fraction });
            }));
            
            const groupedData = anotherArray.reduce((acc, curr) => {
                if (!acc[curr.name]) {
                    acc[curr.name] = { name: curr.name, department: curr.department, fracArraySum: curr.fracArray, count: 1 };
                } else {
                    acc[curr.name].fracArraySum += curr.fracArray;
                    acc[curr.name].count++;
                }
                return acc;
            }, {});
            
            // Calculate the average fracArray for each group and form the array with unique names and details
            const uniqueNamesArray = Object.values(groupedData).map(async (item) => {
                const staffCode = await GetStaffCodeFunc(item.name); // Fetch staff code for the employee
                return {
                    name: item.name,
                    department: item.department,
                    staffCode: staffCode, // Include staff code in the response
                    averageFracArray: item.fracArraySum / item.count
                };
            });
            const sortedUniqueNamesArray = await Promise.all(uniqueNamesArray);
            sortedUniqueNamesArray.sort((a, b) => b.averageFracArray - a.averageFracArray);
            const top3Rankers = sortedUniqueNamesArray.slice(0, 3).map((obj, index) => ({
                ...obj,
                averageFracArray: obj.averageFracArray.toFixed(2),
                medal: index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronz'
            }));  
            console.log(top3Rankers)
            res.send(top3Rankers)      
        }
    } catch (e) {
        console.log(e)
    }
}