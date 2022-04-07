import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

// get all grades based on classID from prisma database
export const getAllGrades = async (req, res) => {
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
    const students = findClass.students
    const assignments = findClass.assignments
    const getData = await Promise.all(students.map(async (student) => {
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
          comments: true
        }
      })
      const getStudentAssignment = await Promise.all(studentHasAssignment.map(async (studentAssignment) => {
        const assignmentInfo = await prisma.assignment.findUnique({
          where: {
            id: studentAssignment.assignmentID
          }
        })
        return {
          assignmentInfo,
          studentAssignment
        }
      }))
      return {
        studentInfo,
        studentHasAssignment: getStudentAssignment
      }
    }))
    res.json(getData)
  } catch (error) {
    console.log(error)
  }
}