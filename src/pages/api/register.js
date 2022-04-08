import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function newUser (firstname,lastname,Email,Password,Avatar,class_ID,res){
  if(firstname&&lastname&&Email&&Password&&Avatar){
    const checkUser = await prisma.user.findUnique({
      where: {
        email:Email
      }
    })
    if(!checkUser){
      try{
        await prisma.user.create({
          data:{
            firstName:firstname,
            lastName:lastname,
            email:Email,
            password:Password,
            avatar:Avatar,
            prefix:'default'
          }
        })
        if(class_ID){
          //find new user id based on email
          const user = await prisma.user.findUnique({
            where: {
              email:Email
            },
            select: {
              id:true
            }
          })
          console.log(user.id)
          //create new student with user id
          await prisma.student.create({
            data:{
              registerDate: new Date(),
              userID:user.id
            }
          })
          //get student id with userID
          const student = await prisma.student.findUnique({
            where:{
              userID:user.id
            },
            select:{
              id:true
            }
          })
          console.log(student.id)
          //create student takes class with classID variable
          await prisma.studentTakesClass.create({
            data:{
              studentID:student.id,
              classID:class_ID,
              finalGrade: '0'
            }
          })
        }

        res.status(200).json({serverStat:200})
      }catch(error){
        res.status(500).json({error})
      }
    }
    else{
      res.status(404).json({serverStat:404})
    }   
  }
  else{
    res.status(400).json({serverStat:400})
  }
}

export default async function handler(req, res) {

  const firstname = req.body.firstName
  const lastname = req.body.lastName
  const Email = req.body.email
  const Avatar = 'default'
  const Password = req.body.password
  const ClassID = req.body.ClassID
  
  if(!ClassID){
    newUser(firstname,lastname,Email,Password,Avatar,'',res)
  }
  else{
    newUser(firstname,lastname,Email,Password,Avatar,ClassID,res)
  }
  
}