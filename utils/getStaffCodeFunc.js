import { Staff } from "../models/users.js"

export const GetStaffCodeFunc = async (name) => {
    let response = await Staff.findOne({name: name})
    return response.staffCode
}