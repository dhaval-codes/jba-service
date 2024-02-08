import { useState } from "react"
import { FilledForm } from "../../models/filledForm.js"

export const sendAdminBarChartData = async (req,res) =>{
    try{
        const {role, dept, year} = req.body;
        if (role === 'Admin') {
            let Querry;
            if(dept && year){
                Querry = await FilledForm.find({$and:[
                    {
                        applicantsDepartment: dept
                    },
                    {
                        "timePeriod.year": year
                    }
                ]});
            } else if (year){
                Querry = await FilledForm.find({"timePeriod.year": year})
            } else if (dept){
                Querry = await FilledForm.find({applicantsDepartment: dept})
            } else {
                Querry = await FilledForm.find()
                let total = 0
                Querry.map((item)=>{
                    total = total + item.cumalativeMarks
                })
                const SchoolAvg = total/Querry.length

                let engTotalMarks = 0;
                let engCount = 0;

                let hindiTotalMarks = 0;
                let hindiCount = 0;

                let mathTotalMarks = 0;
                let mathCount = 0;

                let sciTotalMarks = 0;
                let sciCount = 0;

                let csTotalMarks = 0;
                let csCount = 0;

                let comTotalMarks = 0;
                let comCount = 0;

                let humTotalMarks = 0;
                let humCount = 0;

                let psyTotalMarks = 0;
                let psyCount = 0;

                let peTotalMarks = 0;
                let peCount = 0;

                let perArtTotalMarks = 0;
                let perArtCount = 0;

                let otherTotalMarks = 0;
                let otherCount = 0;

                Querry.forEach(item => {
                    switch(item.applicantsDepartment){
                        case "english":
                            engTotalMarks += item.cumalativeMarks;
                            engCount++
                            break;
                        case "hindi":
                            hindiTotalMarks += item.cumalativeMarks;
                            hindiCount++
                            break;
                        case "maths":
                            mathTotalMarks += item.cumalativeMarks;
                            mathCount++
                            break;
                        case "science":
                            sciTotalMarks += item.cumalativeMarks;
                            sciCount++
                            break;
                        case "cs":
                            csTotalMarks += item.cumalativeMarks;
                            csCount++
                            break;
                        case "commerce":
                            comTotalMarks += item.cumalativeMarks;
                            comCount++
                            break;
                        case "humanities":
                            humTotalMarks += item.cumalativeMarks;
                            humCount++
                            break;
                        case "psycology":
                            psyTotalMarks += item.cumalativeMarks;
                            psyCount++
                            break;
                        case "pe":
                            peTotalMarks += item.cumalativeMarks;
                            peCount++
                            break;
                        case "perArts":
                            perArtTotalMarks += item.cumalativeMarks;
                            perArtCount++
                        default:
                            otherTotalMarks += item.cumalativeMarks;
                            otherCount++
                    }
                })

                const EngAvg = engCount !== 0 ? (engTotalMarks / engCount).toFixed(2) : 0;
                const HindiAvg = hindiCount !== 0 ? (hindiTotalMarks / hindiCount).toFixed(2) : 0;
                const MathAvg = mathCount !== 0 ? (mathTotalMarks / mathCount).toFixed(2) : 0;
                const SciAvg = sciCount !== 0 ? (sciTotalMarks / sciCount).toFixed(2) : 0;
                const CsAvg = csCount !== 0 ? (csTotalMarks / csCount).toFixed(2) : 0;
                const ComAvg = comCount !== 0 ? (comTotalMarks / comCount).toFixed(2) : 0;
                const HumAvg = humCount !== 0 ? (humTotalMarks / humCount).toFixed(2) : 0;
                const PsyAvg = psyCount !== 0 ? (psyTotalMarks / psyCount).toFixed(2) : 0;
                const PeAvg = peCount !== 0 ? (peTotalMarks / peCount).toFixed(2) : 0;
                const PerArtAvg = perArtCount !== 0 ? (perArtTotalMarks / perArtCount).toFixed(2) : 0;
                const OtherAvg = otherCount !== 0 ? (otherTotalMarks / otherCount).toFixed(2) : 0;

                const SendingObj = {
                    schoolAvg: SchoolAvg.toFixed(2),
                    subjCumalative: [EngAvg,HindiAvg,MathAvg,SciAvg,CsAvg,ComAvg,HumAvg,PsyAvg,PeAvg,PerArtAvg,OtherAvg]
                }

                res.send(SendingObj)
            }
            
        } else {
            res.send("Sorry you don't have access to this! Better luck next time")
        }
    } catch (e) {
        console.log(e)
    }
}