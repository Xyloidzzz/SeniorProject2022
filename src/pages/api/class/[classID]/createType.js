import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    classID
  } = req.query

  const type = req.body.type
  const weight = req.body.weight

  if (req.method === "POST") {
    if (type && weight) {
      try {
        const theClass = await prisma.class.findUnique({
          where: {
            id: classID
          },
          select: {
            gradeWeight: true
          }
        })
        const currentJson = theClass.gradeWeight
        currentJson.push({
          type: type,
          weight: weight
        })
        // update class gradeWeight with new "type & weight" json field
        await prisma.class.update({
          where: {
            id: classID
          },
          data: {
            gradeWeight: currentJson
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
}