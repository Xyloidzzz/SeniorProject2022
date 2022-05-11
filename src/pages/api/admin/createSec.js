import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler ( req, res ){
    const id = req.body.id
    const name = req.body.secName
    const num = req.body.secNum
    const schedule = req.body.schedule
    const year = req.body.year
    const term = req.body.term
    let isOnline = req.body.isOnline
    let Synchronous = req.body.Synchronous
    const clsID = req.body.clsID

    console.log(id,name,num,schedule,year,term,isOnline,Synchronous,clsID)

    if(isOnline=='true'){
        isOnline = true
    }
    else{isOnline = false}
    if(Synchronous=='true'){
        Synchronous = true
    }else{Synchronous = false}
    try{
        await prisma.section.create({
            data:{
                id: id,
                fullName: name,
                sectionNum: num,
                schedule: schedule,
                year: year,
                term: term,
                isOnline: isOnline,
                isSynchronous: Synchronous,
                classID: clsID
            }
        })
        res.json({serverStat:200})
    }catch(error){
        res.status(500).json({error})
    }
}