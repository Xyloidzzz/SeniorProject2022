import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    sectionID
  } = req.query

  const type = req.body.type
  const weight = req.body.weight

  if (req.method === "POST") {
    if (type && weight) {
      try {
        const theSection = await prisma.section.findUnique({
          where: {
            id: sectionID
          },
          select: {
            gradeWeight: true
          }
        })
        const currentJson = theSection.gradeWeight
        currentJson.push({
          type: type,
          weight: weight
        })
        // update section gradeWeight with new "type & weight" json field
        await prisma.section.update({
          where: {
            id: sectionID
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