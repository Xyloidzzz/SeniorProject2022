import {
    PrismaClient
  } from "@prisma/client";
  
  const prisma = new PrismaClient()

export default async function handler(req, res) {
  
    try {
        //const students = await prisma.student.findMany()
        const usrStudents = await prisma.user.findMany({
            where:{
                role: 'INSTRUCTOR'
            }
        })
        const getData = await Promise.all(usrStudents.map(async (data)=>{
            const students = await prisma.instructor.findUnique({
                where:{
                    userID: data.id
                }
            })
            return {
                userId: students.userID,
                id: students.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            }
        }))

        if(usrStudents){
            res.json({
                data: getData
            })
        }
    } catch(error) {
        res.status(500).json({
            error
        })
    }
}