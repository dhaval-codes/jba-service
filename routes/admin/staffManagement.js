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

export const updateStaffFunc = async (req,res) => {
    try{
        const {globalRole, staffCode, role, department} = req.body;
        if(globalRole === 'Admin') {
            const update = req.body;
            delete update.globalRole;
            delete update.staffCode;
            if(role === ''){
                delete update.role
            }
            if(department === ''){
                delete update.department
            }
            // console.log(update)
            const updatedDocument = await Staff.findOneAndUpdate(
                { staffCode: staffCode },
                { $set: update },
                { new: true }
            );
            if(updatedDocument) {
                res.send(true)
            }
        }
    } catch (e) {
        console.log(e)
    }
}

export const deleteStaffFunc = async (req,res) => {
    try{
        const {globalRole, staffCode} = req.body;
        if(globalRole === 'Admin'){
            const response = await Staff.findOne({staffCode: staffCode})
            const role = response.role
            if(role === 'Admin'){
                const checkingArray = await Staff.find({role: role})
                if(checkingArray.length > 1){
                    const deletedDocument = await Staff.findOneAndDelete({ staffCode: staffCode });
                    if(deletedDocument){
                        res.send(true)
                    }
                } else {
                    res.send('No')
                }
            } else {
                const deletedDocument = await Staff.findOneAndDelete({ staffCode: staffCode });
                if(deletedDocument){
                    res.send(true)
                }
            }
        }

    } catch (e) {
        console.log(e)
    }
}