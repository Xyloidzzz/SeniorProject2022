import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const {
    classID
  } = req.query
  try {
    const studentTakesClass = await prisma.studentTakesClass.findUnique({
      where: {
        classID: classID
      },
      select: {
        studentID: true,
      }
    })
    const student = await prisma.student.findUnique({
      where: {
        id: studentTakesClass.studentID
      },
      select: {
        userID: true
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
    res.json(user)
  } catch {
    console.log(error)
  }
}