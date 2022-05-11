import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler ( req, res ){
    const id = req.body.id
    const clsTitle = req.body.clsTitle
    const clsDesc = req.body.clsDesc
    const clsDept = req.body.clsDept
    const clsNum = req.body.clsNum
    const creditH = req.body.creditH

    console.log(id,clsTitle,clsDesc,clsDept,clsNum,creditH)
    try{
        await prisma.class.create({
            data:{
                id: id,
                title: clsTitle,
                description: clsDesc,
                department: clsDept,
                classNum: clsNum,
                creditHours: Number(creditH)
            }
        })
        res.json({serverStat:200})
    }catch(error){
        res.status(500).json({error})
    }
}