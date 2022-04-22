import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

// TODO: change frontend new weight % not 0-1

export default async function handler(req, res) {
  const {
    sectionID
  } = req.query

  const title = req.body.title
  const description = req.body.description
  const dueDate = req.body.dueDate
  const attachments = req.body.attachments

  const type = req.body.type
  const weight = req.body.weight
  const isHidden = req.body.isHidden

  if (req.method === "POST") {
    // create new assignment
    if (sectionID && title && description && dueDate && attachments && type && weight && isHidden) {
      try {
        const newAssignment = await prisma.assignment.create({
          data: {
            title: title,
            description: description,
            dueDate: dueDate,
            attachments: attachments,
          }
        })
        // use new assignment to create sectionHasAssignment
        const createSectionRelationship = await prisma.sectionHasAssignment.create({
          data: {
            sectionID: sectionID,
            assignmentID: newAssignment.id,
            type: type,
            weight: parseFloat(weight),
            isHidden: isHidden === "true" ? true : false,
          }
        })
        // students and their IDs from the sectionID
        const students = await prisma.studentTakesSection.findMany({
          where: {
            sectionID: sectionID
          },
          select: {
            studentID: true
          }
        })


        // use new assignment to create studentHasAssignment
        if (students) {
          for (let i = 0; i < students.length; i++) {
            await prisma.studentHasAssignment.create({
              data: {
                studentID: students[i].studentID,
                assignmentID: newAssignment.id,
                grade: '0',
                isGraded: false,
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





  }
}