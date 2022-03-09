import { PrismaClient } from '@prisma/client'
import withSession from 'lib/session'

const prisma = new PrismaClient()

export default withSession(async(req,res)=>{

    const Email = req.body.email
    const Password = req.body.password
    
    try{
        const user = await prisma.user.findUnique({
            where:{
                email: Email.toLowerCase()
            }
        })
        if(user){
            console.log(user.password)
                if(user.password==Password){
                    req.session.set('user',{id:user.id,email:user.email})
                    await req.session.save()
                    res.status(200).json({serverStat:200})
                }
                else{
                    res.status(404).json({serverStat:404})
                }
            }
        else{
            res.status(400).json({serverStat:400})
        }

    }catch (error){
        res.status(400).json({serverStat:400})
    }
});