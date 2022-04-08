import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

async function updateGrade(studentID, assignmentID, grade, res) {
  if (studentID && assignmentID && grade) {
    try {
      await prisma.studentHasAssignment.updateMany({
        where: {
          studentID: studentID,
          assignmentID: assignmentID
        },
        data: {
          grade: grade,
          isGraded: true
        }
      })
      res.status(200).json({
        serverStat: 200
      })
    } catch (error) {
      res.status(500).json({
        error
      })
    }
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const studentID = req.body.studentID
    const assignmentID = req.body.assignmentID
    const grade = req.body.grade

    updateGrade(studentID, assignmentID, grade, res)
  } else {
    res.status(405).json({
      serverStat: 405
    })
  }
}