import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler (req, res) {
    
    const stuID = req.body.stuID
    const sectID = req.body.sectID

    const id = stuID+'-'+sectID

    try{
        await prisma.studentTakesSection.create({
            data:{
                id: stuID + '-' + sectID,
                studentID: stuID,
                sectionID: sectID
            }
        })
        res.json({serverStat: 200})
    }catch (error){
        console.log(error)
        res.json({error})
    }
}