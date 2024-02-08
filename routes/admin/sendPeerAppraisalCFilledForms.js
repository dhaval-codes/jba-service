import { FilledForm } from "../../models/filledForm.js";
import { extractMonthAndYear } from "../../utils/extractDate.js";

export const sendFilledCForm = async (req,res) => {
    try{
        const {role, date} = req.body;
        const {year} = extractMonthAndYear(date)
        if(role === 'Admin'){
            const Req = await FilledForm.find({$and:[{name:'Appraisal Form C'},{"timePeriod.year": year}]})
            res.send(Req)
        }
    } catch (e) {
        console.log(e)
    }
}