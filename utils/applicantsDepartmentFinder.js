import { Staff } from "../models/users.js";

export const applicantsDepartmentFinder = async (finderName) => {
    try {
        const result = await Staff.findOne({ name: finderName });

        if (!result) {
            throw new Error(`Staff with name ${finderName} not found`);
        }

        const returnData = result.department;
        return returnData;
    } catch (error) {
        console.error(`Error in applicantsDepartmentFinder: ${error.message}`);
        throw error; // Re-throw the error to handle it at the calling code or log it appropriately.
    }
};
