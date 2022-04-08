import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

// get all grades based on classID from prisma database
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
        assignments: true
      }
    })
    const getData = await Promise.all(findClass.students.map(async (student) => {
      const studentInfo = await prisma.student.findUnique({
        where: {
          id: student.studentID
        }
      })
      const studentHasAssignment = await prisma.studentHasAssignment.findMany({
        where: {
          studentID: student.studentID
        },
        select: {
          assignmentID: true,
          grade: true,
        }
      })
      // get assignment id, title, and grade from studentAssignment
      const getStudentAssignment = await Promise.all(studentHasAssignment.map(async (studentAssignment) => {
        const assignmentInfo = await prisma.assignment.findUnique({
          where: {
            id: studentAssignment.assignmentID
          },
          select: {
            id: true,
            title: true,
            dueDate: true,
          }
        })
        const studentAssignmentGrade = {
          assignmentID: assignmentInfo.id,
          title: assignmentInfo.title,
          dueDate: assignmentInfo.dueDate,
          grade: studentAssignment.grade,
          isGraded: studentAssignment.isGraded,
        }
        return studentAssignmentGrade
      }))
      // get firstName and lastName from user table
      const user = await prisma.user.findUnique({
        where: {
          id: studentInfo.userID
        },
        select: {
          firstName: true,
          lastName: true
        }
      })
      const gradeInfo = {
        studentID: studentInfo.id,
        firstName: user.firstName,
        lastName: user.lastName,
        assignmentInfo: getStudentAssignment,
        finalGrade: student.finalGrade,
      }
      return gradeInfo
    }))
    res.json(getData)
  } catch (error) {
    console.log(error)
  }
}