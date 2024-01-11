import { SideBarFormMetaDeta } from "../../models/sidebarFormMetaData.js";

export const sideBarFormMetaDeta = async (req, res) => {
    try {
        const role = req.query.for;
        const DataArray = await SideBarFormMetaDeta.find({for: role});
        if(!DataArray){
            return res.send({message: "Can't find data"})
        }
        res.send(DataArray)
    } catch (e){
        console.log(e);
        res.send({message: "Server Error"})

    }

}