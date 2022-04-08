import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

// TODO: Relation Tables are not getting created properly. I think its cause its just doing the first one and excaping.

export default async function handler(req, res) {
  const classID = req.query

  const title = req.body.title
  const description = req.body.description
  const dueDate = req.body.dueDate
  const attachments = req.body.attachments

  const type = req.body.type
  const weight = req.body.weight
  const isHidden = req.body.isHidden

  if (req.method === "POST") {
    // create new assignment
    if (classID && title && description && dueDate && attachments && type && weight && isHidden) {
      try {
        const newAssignment = await prisma.assignment.create({
          data: {
            title: title,
            description: description,
            dueDate: dueDate,
            attachments: attachments,
          },
          select: {
            id: true,
          }
        })
        // use new assignment to create classHasAssignment
        const createClassHasAssignment = await prisma.classHasAssignment.create({
          data: {
            classID: classID,
            assignmentID: newAssignment.id,
            type: type,
            weight: weight,
            isHidden: isHidden
          }
        })
        // update class gradeWeight with new "type: weight" json field
        const updateClass = await prisma.class.update({
          where: {
            id: classID
          },
          data: {
            gradeWeight: {
              create: {
                type: type,
                weight: weight
              }
            }
          }
        })
        // students and their IDs from the classID
        const students = await prisma.studentTakesClass.findMany({
          where: {
            classID: classID
          },
          select: {
            studentID: true
          }
        })

        prisma.$transaction([
          newAssignment,
          createClassHasAssignment,
          updateClass,
          students
        ])

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