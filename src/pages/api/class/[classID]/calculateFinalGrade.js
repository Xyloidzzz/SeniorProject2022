import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

// update final grade for every student in a class
// based on all their assignment grades and the associated weights

export default async function handler(req, res) {
  const {
    classID
  } = req.query

  try {
    const theClass = await prisma.class.findUnique({
      where: {
        id: classID
      },
      select: {
        students: true,
        assignments: true
      }
    })
    const getData = await Promise.all(theClass.students.map(async (student) => {
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
            type: true,
            weight: true,
          }
        })
        const studentAssignmentGrade = {
          assignmentID: assignmentInfo.id,
          title: assignmentInfo.title,
          type: assignmentInfo.type,
          weight: assignmentInfo.weight,
          grade: studentAssignment.grade,
          isGraded: studentAssignment.isGraded,
        }
        return studentAssignmentGrade
      }))
      const studentGrade = {
        studentID: studentInfo.id,
        assignments: getStudentAssignment
      }
      return studentGrade
    }))
    // calculate final grade for each student for each assignment type
    const finalGrade = await Promise.all(getData.map(async (student) => {
      const gradesByType = []
      for (let i = 0; i < student.assignments.length; i++) {
        const assignment = student.assignments[i]
        const grade = assignment.grade
        const type = assignment.type
        const weight = assignment.weight
      }
    }))
    // // TODO: FIX THIS FUNCTION IT IS NOT CORRECT
    // const {
    //   assignments
    // } = student
    // const {
    //   weight
    // } = student.assignements
    // const totalWeight = weight.reduce((acc, curr) => acc + curr)
    // const totalGrade = assignments.reduce((acc, curr) => acc + curr.grade, 0)
    // const final = (totalGrade / totalWeight) * 100
    // return final
    // }))
    // // update final grade for each student
    // const updateFinalGrade = await Promise.all(getData.map(async (student) => {
    //   const {
    //     studentID
    //   } = student
    //   const updateFinalGrade = await prisma.student.update({
    //     where: {
    //       id: studentID
    //     },
    //     data: {
    //       finalGrade: finalGrade
    //     }
    //   })
    //   return updateFinalGrade
    // }))
    res.status(200).json({
      ServerStat: 200,
      message: "Successfully calculated final grade for all students.",
    })
  } catch (error) {
    res.status(500).json({
      message: "Error calculating final grade for all students.",
      data: error
    })
  }
}