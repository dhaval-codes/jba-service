export const recieveFormData = async (req,res)=> {
    try{
        const{
            formName,
            filledBy,
            applicantsName,
            fillersDesignation,
            applicantsDepartment,
            timePeriod,
            filledData
        } = req.body;
            res.send('working')
    } catch (e) {
        console.log(e)
        res.send("Can't save form")
    }
}