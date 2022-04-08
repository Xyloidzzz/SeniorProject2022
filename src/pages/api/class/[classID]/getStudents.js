import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const {
    classID
  } = req.query
  try {
    const findClass = await prisma.class.findUnique({
      where: {
        id: classID
      },
      select: {
        students: true,
        attendance: true
      }
    })
    const getData = await Promise.all(findClass.students.map(async (data) => {
      const student = await prisma.student.findUnique({
        where: {
          id: data.studentID
        },
        select: {
          id: true,
          registerDate: true,
          userID: true,
        }
      })
      const user = await prisma.user.findUnique({
        where: {
          id: student.userID
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          avatar: true,
        }
      })
      const studentInfo = {
        studentID: student.id,
        userID: user.id,
        registerDate: student.registerDate,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        attendance: students.attendance,
      }
      return studentInfo
    }))
    res.json(getData)
  } catch {
    console.log(error)
  }
}