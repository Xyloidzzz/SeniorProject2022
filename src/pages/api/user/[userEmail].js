import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler (req,res){
    const {userEmail} = req.query
    try{
        const user = await prisma.user.findUnique({
            where: {
                email:userEmail
            },
            select:{
                firstName: true,
                lastName: true
            }
        })
        res.json(user)
    }catch{

    }
    //res.json({email:userEmail})
}