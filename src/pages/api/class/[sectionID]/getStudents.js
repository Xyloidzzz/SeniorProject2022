import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const {
    sectionID
  } = req.query
  try {
    const findSection = await prisma.section.findUnique({
      where: {
        id: sectionID
      },
      select: {
        students: true,
      }
    })
    const getData = await Promise.all(findSection.students.map(async (data) => {
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
      const studentSectionRelation = await prisma.studentTakesSection.findMany({
        where: {
          studentID: student.id,
          sectionID: sectionID
        },
        select: {
          id: true,
          attendance: true,
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
        attendance: studentSectionRelation.attendance,
      }
      return studentInfo
    }))
    res.json(getData)
  } catch {
    console.log(error)
  }
}