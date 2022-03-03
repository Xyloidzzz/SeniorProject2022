import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req,res){

    const Email = req.body.email
    const Password = req.body.password
    
    try{
        await prisma.user.findUnique({
            where:{
                email: Email
            }
        }).then(user=>{
            if(user){
                console.log(user.password)
                if(user.password==Password){
                    res.status(200).json({serverStat:200})
                }
                else{
                    res.status(404).json({serverStat:404})
                }
            }
            else{
                res.status(400).json({serverStat:400})
            }
        })
    }catch (error){
        res.status(400).json({serverStat:400})
    }
}