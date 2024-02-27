import { FilledForm } from "../../models/filledForm.js"

export const sendFilledFormData = async (req,res) => {
    try{
        const Year = parseInt(req.query.year)
        const result = await FilledForm.find({"timePeriod.year": Year})
        res.send(result);
    } catch (e) {
        console.log(e)
    }
}

export const deleteFormfunc = async (req,res) => {
    try{
        const {id} = req.body;
        const result = await FilledForm.findByIdAndDelete(id)
        if(result){
            res.send(true)
        } else {
            res.send(false)
        }
    } catch (e) {
        console.log(e)
    }
}