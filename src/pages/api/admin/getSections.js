import {
    PrismaClient
  } from "@prisma/client";
  
  const prisma = new PrismaClient()

export default async function handler(req, res) {
  
    try {
        const sections = await prisma.section.findMany()
        console.log(sections)
        if(sections){
            res.json({
                data: sections
            })
        }
    } catch(error) {
        res.status(500).json({
            error
        })
    }
}