import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

// check section gradeWeight and update type and weight from Assignment
export default async function handler(req, res) {
  const {
    sectionID
  } = req.query

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

    // find all assignments in section with same type name as each type in gradeWeight
    for (let i = 0; i < currentJson.length; i++) {
      const assignments = await prisma.assignment.findMany({
        where: {
          type: currentJson[i].type
        }
      })
      // update Assignment type and weight with section gradeWeight
      for (let j = 0; j < assignments.length; j++) {
        await prisma.assignment.update({
          where: {
            id: assignments[j].id
          },
          data: {
            weight: parseFloat(currentJson[i].weight),
          }
        })
      }
    }
    res.status(200).json({
      serverStat: 200
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}