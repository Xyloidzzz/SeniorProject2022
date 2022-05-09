import {
    PrismaClient
  } from "@prisma/client";
  
  const prisma = new PrismaClient()

export default async function handler(req, res) {
  
    try {
        const classes = await prisma.class.findMany()
        console.log(classes)
        if(classes){
            res.json({
                data: classes
            })
        }
    } catch(error) {
        res.status(500).json({
            error
        })
    }
}