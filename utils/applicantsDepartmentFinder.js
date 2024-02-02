import { Staff } from "../models/users.js";

export const applicantsDepartmentFinder = async (finderName) => {
    try{
        const result = await Staff.findOne({name: finderName});
        const returnData = result.department
        return returnData
    } catch (e) {
        console.log(e)
    }
}