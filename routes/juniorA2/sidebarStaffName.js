import { Staff } from "../../models/users.js";
import { juniorFinder } from "../../utils/juniorFinder.js";

export const juniorA2Stafflist = async (req, res) => {
    try {
        const {role, department} = req.body
        const checkRole = juniorFinder(role);
        if(role === 'HOD') {
            let details = await Staff.find({$and: [{role: checkRole},{department: department}]}).select({ password: 0, department: 0 });
            res.send(details)
        } else if ( role === 'Co-ordinator') {
            let details = await Staff.find({role: checkRole}).select({password:0})
            res.send(details)
        }
    } catch (e) {
        console.log(e)
    }
}
