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

  if (req.method === "GET") {
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
            }
          })
          // get class type and weight from classHasAssignment table
          const classHasAssignment = await prisma.classHasAssignment.findMany({
            where: {
              assignmentID: studentAssignment.assignmentID
            },
            select: {
              type: true,
              weight: true,
            }
          })
          const studentAssignmentGrade = {
            assignmentID: assignmentInfo.id,
            title: assignmentInfo.title,
            type: classHasAssignment.type,
            weight: classHasAssignment.weight,
            grade: studentAssignment.grade,
            // isGraded: studentAssignment.isGraded,
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
      const updateFinalGrade = await Promise.all(getData.map(async (student) => {
        const typesWithGrade = []
        for (let i = 0; i < student.assignments.length; i++) {
          const assignment = student.assignments[i]
          const grade = parseFloat(assignment.grade)
          const assType = assignment.type
          const weight = parseFloat(assignment.weight)
          // if type is not yet in typesWithGrade, add it
          if (!typesWithGrade.includes(assType)) {
            typesWithGrade.push({
              type: assType,
              weight,
              gradeSum: grade,
              count: 1
            })
          } else {
            // if type is already in typesWithGrade, add grade to the existing type
            for (let j = 0; j < typesWithGrade.length; j++) {
              if (typesWithGrade[j].type === assType) {
                typesWithGrade[j].gradeSum += grade
                typesWithGrade[j].count += 1
              }
            }
          }
        }
        // calculate final grade for each student by taking each type's gradeSum and dividing by the count then multiply that result by the weight
        const gradePerType = typesWithGrade.map((typeSect) => {
          const final = (typeSect.gradeSum / typeSect.count) * typeSect.weight
          return final
        })
        // return the sum of all values in gradePerType
        const finalGrade = gradePerType.reduce((a, b) => a + b, 0)
        // update the finalGrade in the studentTakesClass table for this student
        await prisma.studentTakesClass.updateMany({
          where: {
            studentID: student.studentID,
            classID: classID
          },
          data: {
            finalGrade: finalGrade.toString()
          }
        })
        const returnData = {
          studentID: student.studentID,
          finalGrade: finalGrade.toString()
        }
        return returnData
      }))
      res.status(200).json({
        ServerStat: 200,
        message: "Successfully calculated final grade for all students.",
        data: updateFinalGrade
      })
    } catch (error) {
      res.status(500).json({
        ServerStat: 500,
        message: "Error calculating final grade for all students.",
        error
      })
    }
  }
}