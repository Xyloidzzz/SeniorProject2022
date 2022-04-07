import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const studentID = req.body.studentID
    const assignmentID = req.body.assignmentID
    const grade = req.body.grade

    if (studentID && assignmentID && grade) {
      try {
        await prisma.studentHasAssignment.update({
          where: {
            studentID: studentID,
            assignmentID: assignmentID
          },
          data: {
            grade: grade
          }
        })
        res.status(200).json({
          serverStat: 200
        })
      } catch (error) {
        res.status(400).json({
          error
        })
      }
    }
  } else {
    res.status(405).json({
      serverStat: 405
    })
  }
}