import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler (req, res) {
    
    const instID = req.body.instID
    const sectID = req.body.sectID

    const id = instID+'-'+sectID

    try{
        await prisma.instructorTeachesSection.create({
            data:{
                id: instID + '-' + sectID,
                instructorID: instID,
                sectionID: sectID
            }
        })
        res.json({serverStat: 200})
    }catch (error){
        console.log(error)
        res.json({error})
    }
}