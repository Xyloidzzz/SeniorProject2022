import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

  if(req.method ==='GET'){
    res.status(200).json({message:'empty'})
  }
  else if(req.method==='POST'){
    const firstname = req.body.firstName
    const lastname = req.body.lastName
    const Email = req.body.email
    const Avatar = 'default'
    const Password = req.body.password
    if(firstname&&lastname&&Email&&Password&&Avatar){
        try{
              await prisma.user.create({
                data:{
                  firstName:firstname,
                  lastName:lastname,
                  email:Email,
                  password:Password,
                  avatar:Avatar
                }
              })
              res.status(200).json({serverStat:200})
            }catch(error){
              res.status(400).json({error})
        }
    }
    else{
      res.status(404).json({serverStat:404})
    }
  }
}