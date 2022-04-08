import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const studentID = req.query.studentID
  const classID = req.query.classID
  const finalGrade = req.query.finalGrade

  if (studentID && classID && finalGrade) {
    try {
      await prisma.studentTakesClass.updateMany({
        where: {
          studentID: studentID,
          classID: classID
        },
        data: {
          finalGrade: finalGrade
        },
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
}