import { Staff } from "../../models/users.js";

export const addNewEmployeeFunc = async (req,res) => {
    try{
        const {employeeName, role, staffCode, department, password, globalRole} = req.body;
        if(globalRole === 'Admin') {
            const newEmployee = new Staff({
                name: employeeName,
                password: password,
                role: role,
                department: department,
                staffCode: staffCode
            });
            const result = await newEmployee.save();
            if(result){
                res.send(true)
            }
        }
    } catch (e) {
        console.log(e)
    }
}

export const checkExistenceFunc = async (req,res) => {
    try{
        const {role, staffCode} = req.body;
        if(role === 'Admin') {
            let response = await Staff.findOne({staffCode: staffCode})
            res.send(response)
        }
    } catch (e) {
        console.log(e)
    }
}