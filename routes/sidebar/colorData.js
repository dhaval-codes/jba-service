import { FillersDescription } from "../../models/fillersDescription.js";

export const sidebarColorDetails = async (req,res)=>{
    try{
        const role = req.query.for;
        const detailsArray = await FillersDescription.find({for: role});
        if(!detailsArray){
            res.send({message: "Sorry can't find it"})
        }
        res.send(detailsArray);
    } catch (e){
        console.log(e)
    }
}