export const getDepartments = async (req,res) => {
    try {
        const role = req.query.role;
        if(role === 'Admin'){
            res.send(['english','hindi','maths','science','cs','commerce','humanties','psycology','pe','perArts','Others'])
        }
    } catch (e) {
        console.log(e)
    }
}